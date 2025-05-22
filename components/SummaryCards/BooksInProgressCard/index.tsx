"use client";

import { useContext, useMemo } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import { Stat } from '@/@types';
import SummaryCard from '@/components/SummaryCards/SummaryCard';

export default function BooksInProgressCard() {
  const { db } = useContext(StatisticsContext);

  const currentlyReading = useMemo<Stat | null>(() => {
    if (db === null) return null;

    const { currentlyReadingCount } = db
      .prepare(`
          SELECT COUNT(DISTINCT id_book) as currentlyReadingCount
          FROM page_stat_data
          WHERE strftime('%W', datetime(start_time, 'unixepoch', 'localtime')) = strftime('%W', '-6 days', 'localtime')
      `)
      .getAsObject({ $start: 1, $end: 1 });

    return {
      title: 'Currently reading',
      value: `${String(currentlyReadingCount)}`,
      description: 'Books you opened this week',
    };
  }, [db]);

  return <SummaryCard stat={currentlyReading} />;
}
