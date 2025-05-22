"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { BookOpenTextIcon, TimerIcon } from 'lucide-react';
import { JSX, PropsWithoutRef, useContext, useMemo } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import dayjs from 'dayjs';

const chartConfig = {
  minutes: {
    label: "Minutes",
    color: "#2563eb",
    icon: TimerIcon,
  },
  pages: {
    label: "Pages",
    color: "#60a5fa",
    icon: BookOpenTextIcon,
  },
} satisfies ChartConfig;

type Props = PropsWithoutRef<JSX.IntrinsicElements["div"]>;

type ChartData = {
  day: string;
  minutes: number;
  pages: number;
}

export default function WeeklyReadingBarChart({ ...props }: Props) {
  const { db } = useContext(StatisticsContext);


  const data = useMemo<ChartData[] | null>(() => {
    if (db === null) return null;

    const result = db.exec(`
        WITH last_sunday AS (SELECT date ('now', 'weekday 0', '-14 days' ) AS sun), week_days AS (
        SELECT date (sun, '+' || n || ' days') AS day
        FROM last_sunday, (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3
            UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6)
            )
        SELECT wd.day,
               COALESCE(SUM(psd.duration), 0)        AS seconds,
               COALESCE(COUNT(DISTINCT psd.page), 0) AS pages
        FROM week_days wd
                 LEFT JOIN page_stat_data psd
                           ON wd.day = strftime('%Y-%m-%d', psd.start_time, 'unixepoch')
        GROUP BY wd.day
        ORDER BY wd.day ASC;
    `);

    return result[0].values.map(([day, seconds, pages]) => {
      return {
        day: dayjs(String(day)).format("ddd, MMM D"),
        minutes: Math.floor(Number(seconds) / 60 || 0),
        pages: Number(pages) || 0,
      };
    });
  }, [db]);

  if (data === null) return null;

  return (
    <ChartContainer {...props} config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />

        <ChartTooltip content={<ChartTooltipContent />} />

        <ChartLegend content={<ChartLegendContent />} />

        <Bar dataKey="minutes" fill="var(--color-minutes)" radius={4} />

        <Bar dataKey="pages" fill="var(--color-pages)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
