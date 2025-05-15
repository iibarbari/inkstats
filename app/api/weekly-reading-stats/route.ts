import { db } from '@/lib/db';
import { page_stat_data } from '@/lib/schemas';
import dayjs from 'dayjs';
import { and, countDistinct, eq, gte, lt, lte, sql, sum } from 'drizzle-orm';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

const chartData = [
  { day: "January", minutes: 187, pages: 80 },
  { day: "February", minutes: 305, pages: 200 },
  { day: "March", minutes: 237, pages: 120 },
  { day: "April", minutes: 73, pages: 190 },
  { day: "May", minutes: 209, pages: 130 },
  { day: "June", minutes: 214, pages: 140 },
];

export async function GET() {
  const lastWeekStart = dayjs().subtract(1, 'week').weekday(0).startOf('day').unix();
  const lastWeekEnd = dayjs().subtract(1, 'week').weekday(6).endOf('day').unix();
  const thisWeekStart = dayjs().weekday(0).startOf('day').unix();

  const res = await db
    .select({
      day: sql<string>`date(${page_stat_data.start_time}, 'unixepoch')`,
      seconds: sum(page_stat_data.duration),
      pages: countDistinct(page_stat_data.page)
    })
    .from(page_stat_data)
    .where(and(
      gte(page_stat_data.start_time, lastWeekStart),
      lt(page_stat_data.start_time, thisWeekStart)
    ))
    .groupBy(sql<string>`date(${page_stat_data.start_time}, 'unixepoch')`);

  const formattedRes = res.map((item) => ({
    day: item.day,
    minutes: Math.round(Number(item.seconds) / 60),
    pages: Number(item.pages),
  }));

  return new Response(JSON.stringify(formattedRes), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
