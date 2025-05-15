import { db } from '@/lib/db';
import { page_stat_data } from '@/lib/schemas';
import dayjs from 'dayjs';
import { and, countDistinct, gte, lt, sql, sum } from 'drizzle-orm';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

export async function GET() {
  const lastWeekStart = dayjs().subtract(1, 'week').weekday(0).startOf('day').unix();
  const thisWeekStart = dayjs().weekday(0).startOf('day').unix();

  const res = await db
    .select({
      day: sql<string>`date(
      ${page_stat_data.start_time},
      'unixepoch'
      )`,
      seconds: sum(page_stat_data.duration),
      pages: countDistinct(page_stat_data.page)
    })
    .from(page_stat_data)
    .where(and(
      gte(page_stat_data.start_time, lastWeekStart),
      lt(page_stat_data.start_time, thisWeekStart)
    ))
    .groupBy(sql<string>`date(
    ${page_stat_data.start_time},
    'unixepoch'
    )`);

  const dataMap = new Map(
    res.map(row => [row.day, row])
  );

  const lastWeekDates = Array.from({ length: 7 }, (_, i) => {
    const date = dayjs().subtract(1, 'week').weekday(i);
    return {
      dayName: date,
      dateString: date.format('YYYY-MM-DD')
    };
  });

  const formattedRes = lastWeekDates.map(({ dayName, dateString }) => {
    const data = dataMap.get(dateString);

    return {
      day: dayjs(dayName).format("ddd, MMM D"),
      minutes: data ? Math.floor(Number(data.seconds) / 60 || 0) : 0,
      pages: data ? Number(data.pages) || 0 : 0
    };
  });

  return new Response(JSON.stringify(formattedRes), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
