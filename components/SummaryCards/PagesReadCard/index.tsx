"use client";

import { useContext, useMemo } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import { Stat } from '@/@types';
import SummaryCard from '@/components/SummaryCards/SummaryCard';

export default function PagesReadCard() {
  const { db } = useContext(StatisticsContext);

  const weeklyReadPages = useMemo<Stat | null>(() => {
    if (db === null) return null;

    const { pagesReadThisWeek } = db
      .prepare(`
          SELECT COUNT(DISTINCT page) as pagesReadThisWeek
          FROM page_stat_data
          WHERE strftime('%W', datetime(start_time, 'unixepoch', 'localtime')) = strftime('%W', 'now', 'localtime')
      `)
      .getAsObject({ $start: 1, $end: 1 });

    const { pagesReadLastWeek } = db
      .prepare(`
          SELECT COUNT(DISTINCT page) as pagesReadLastWeek
          FROM page_stat_data
          WHERE strftime('%W', datetime(start_time, 'unixepoch', 'localtime')) =
                strftime('%W', date('now','-6 days'), 'localtime')
      `)
      .getAsObject({ $start: 1, $end: 1 });

    return {
      title: 'Pages read',
      value: `${String(pagesReadThisWeek)} pages`,
      description: 'Pages read this week',
      trend: {
        value: Math.round(((Number(pagesReadThisWeek) || 0) - (Number(pagesReadLastWeek) || 0)) / (Number(pagesReadLastWeek) || 1) * 100),
        status: (Number(pagesReadThisWeek) || 0) - (Number(pagesReadLastWeek) || 0) > 0 ? "positive" : (Number(pagesReadThisWeek) || 0) - (Number(pagesReadLastWeek) || 0) < 0 ? "negative" : "neutral",
      },
    };
  }, [db]);

  return <SummaryCard stat={weeklyReadPages} />;
}
