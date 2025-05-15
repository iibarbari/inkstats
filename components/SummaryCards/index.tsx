import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ReactNode } from 'react';
import { db } from '@/lib/db';
import { and, count, countDistinct, desc, eq, gt, gte, lt, lte, sql, sum } from 'drizzle-orm';
import { book, page_stat_data } from '@/lib/schemas';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

type Stat = {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    status: "positive" | "negative" | "neutral";
  };
}

export default async function SummaryCards() {
  const thisWeekStart = dayjs().weekday(0).startOf('day').unix();
  const thisWeekEnd = dayjs().weekday(6).endOf('day').unix();

  const lastWeekStart = dayjs().subtract(1, 'week').weekday(0).startOf('day').unix();
  const lastWeekEnd = dayjs().subtract(1, 'week').weekday(6).endOf('day').unix();

  const [{ readThisWeek, pagesReadThisWeek }] = await db
    .select({
      readThisWeek: sum(page_stat_data.duration),
      pagesReadThisWeek: countDistinct(page_stat_data.page)
    })
    .from(page_stat_data)
    .where(and(
      gte(page_stat_data.start_time, thisWeekStart),
      lte(page_stat_data.start_time, thisWeekEnd)
    ));

  const [{ readLastWeek, pagesReadLastWeek }] = await db
    .select({
      readLastWeek: sum(page_stat_data.duration),
      pagesReadLastWeek: countDistinct(page_stat_data.page)
    })
    .from(page_stat_data)
    .where(and(
      gte(page_stat_data.start_time, lastWeekStart),
      lte(page_stat_data.start_time, lastWeekEnd)
    ));

  const weeklyReadingTime: Stat = {
    title: 'Reading time',
    value: dayjs(Number(readThisWeek) * 1000).format('HH:mm:ss'),
    description: 'Hours spent reading this week',
    trend: {
      value: Math.round(((Number(readThisWeek) || 0) - (Number(readLastWeek) || 0)) / (Number(readLastWeek) || 1) * 100),
      status: (Number(readThisWeek) || 0) - (Number(readLastWeek) || 0) > 0 ? "positive" : (Number(readThisWeek) || 0) - (Number(readLastWeek) || 0) < 0 ? "negative" : "neutral",
    },
  };

  const distinctDays = await db
    .selectDistinct({
      distinctDays: sql<string>`strftime
      ('%Y-%m-%d', start_time, 'unixepoch')`
    })
    .from(page_stat_data)
    .orderBy(desc(sql`strftime
    ('%Y-%m-%d', start_time, 'unixepoch')`))
    .all();

  const days = distinctDays.map(({ distinctDays }) => distinctDays);

  let streakDays = 0;

  for (let i = 0; i < days.length; i++) {
    const currentDay = dayjs(days[i]);
    const nextDay = dayjs(days[i + 1]);

    if (currentDay.isSame(nextDay.add(1, 'day'))) {
      streakDays++;
    } else {
      break;
    }
  }

  const latestPages = db
    .select({
      id_book: page_stat_data.id_book,
      max_page: sql`MAX(
      ${page_stat_data.page}
      )`.as('max_page')
    })
    .from(page_stat_data)
    .groupBy(page_stat_data.id_book)
    .as('latestPages');

  const [{ currentlyReadingCount }] = await db
    .select({
      currentlyReadingCount: count().as('count')
    })
    .from(book)
    .innerJoin(latestPages, eq(book.id, latestPages.id_book))
    .where(
      and(
        gt(book.total_read_pages, 0),
        lt(book.total_read_pages, book.pages),
        lt(latestPages.max_page, book.pages),
        gt(book.last_open, thisWeekStart)
      )
    )
    .orderBy(desc(book.last_open));


  const weeklyPagesRead: Stat = {
    title: 'Pages read',
    value: `${String(pagesReadThisWeek)} pages`,
    description: 'Pages read this week',
    trend: {
      value: Math.round(((Number(pagesReadThisWeek) || 0) - (Number(pagesReadLastWeek) || 0)) / (Number(pagesReadLastWeek) || 1) * 100),
      status: (Number(pagesReadThisWeek) || 0) - (Number(pagesReadLastWeek) || 0) > 0 ? "positive" : (Number(pagesReadThisWeek) || 0) - (Number(pagesReadLastWeek) || 0) < 0 ? "negative" : "neutral",
    },
  };

  const streak: Stat = {
    title: 'Streak',
    value: `${streakDays} day(s)`,
    description: 'You have been consistently reading for',
  };


  const booksInProgress: Stat = {
    title: 'Currently reading',
    value: `${String(currentlyReadingCount)}`,
    description: 'Books you read this week',
  };

  const stats: Stat[] = [
    weeklyReadingTime,
    weeklyPagesRead,
    streak,
    booksInProgress
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card className="@container/card" key={stat.title}>
          <CardHeader className="relative">
            <CardDescription>
              {stat.title}
            </CardDescription>

            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">{stat.value}</CardTitle>

            {stat.trend && (
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  {
                    stat.trend.status === "positive" ? (
                      <TrendingUpIcon className="size-3" />
                    ) : stat.trend?.status === "negative" ? (
                      <TrendingDownIcon className="size-3" />
                    ) : null
                  }

                  {`${stat.trend.value}%`}
                </Badge>
              </div>
            )}
          </CardHeader>


          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="text-muted-foreground">
              {stat.description}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
