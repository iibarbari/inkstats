"use client";

import { useContext, useMemo } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import { Stat } from '@/@types';
import dayjs from 'dayjs';
import SummaryCard from '@/components/SummaryCards/SummaryCard';

export default function ReadingTimeCard() {
  const { db } = useContext(StatisticsContext);

  const weeklyReadingTime = useMemo<Stat | null>(() => {
    if (db === null) return null;

    const { readThisWeek } = db
      .prepare(`
          SELECT COALESCE(SUM(duration), 0) as readThisWeek
          FROM page_stat_data
          WHERE strftime('%W', datetime(start_time, 'unixepoch', 'localtime')) = strftime('%W', 'now', 'localtime')
      `)
      .getAsObject({ $start: 1, $end: 1 });

    const { readLastWeek } = db
      .prepare(`
          SELECT COALESCE(SUM(duration), 0) as readLastWeek
          FROM page_stat_data
          WHERE strftime('%W', datetime(start_time, 'unixepoch', 'localtime')) =
                strftime('%W', date('now','-6 days'), 'localtime')
      `)
      .getAsObject({ $start: 1, $end: 1 });

    return {
      title: 'Reading time',
      value: readThisWeek === 0
        ? "00:00:00"
        : dayjs(Number(readThisWeek) * 1000).format('HH:mm:ss'),
      description: 'Hours spent reading this week',
      trend: typeof readLastWeek === "number" && readLastWeek > 0 ? {
        value: Math.round(((Number(readThisWeek) || 0) - (Number(readLastWeek) || 0)) / (Number(readLastWeek) || 1) * 100),
        status: (Number(readThisWeek) || 0) - (Number(readLastWeek) || 0) > 0 ? "positive" : (Number(readThisWeek) || 0) - (Number(readLastWeek) || 0) < 0 ? "negative" : "neutral",
      } : undefined,
    };
  }, [db]);

  return <SummaryCard stat={weeklyReadingTime} />;
}
