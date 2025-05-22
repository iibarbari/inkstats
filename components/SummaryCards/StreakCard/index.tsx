"use client";

import { useContext, useMemo } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import { Stat } from '@/@types';
import SummaryCard from '@/components/SummaryCards/SummaryCard';

export default function StreakCard() {
  const { db } = useContext(StatisticsContext);

  const streak = useMemo<Stat | null>(() => {
    if (db === null) return null;

    const { currentStreak } = db
      .prepare(`
          WITH ordered_dates AS (SELECT DISTINCT strftime('%Y-%m-%d', start_time, 'unixepoch') as date
          FROM page_stat_data
          ORDER BY date DESC
              ),
              numbered_dates AS (
          SELECT
              date, ROW_NUMBER() OVER (ORDER BY date DESC) as row_num
          FROM ordered_dates
              )
          SELECT COUNT(*) as currentStreak
          FROM numbered_dates
          WHERE julianday((SELECT date FROM numbered_dates WHERE row_num = 1)) - julianday(date) = row_num - 1;
      `)
      .getAsObject({ $start: 1, $end: 1 });

    return {
      title: 'Streak',
      value: `${currentStreak} day(s)`,
      description: 'You have been consistently reading for',
    };
  }, [db]);

  return <SummaryCard stat={streak} />;
}
