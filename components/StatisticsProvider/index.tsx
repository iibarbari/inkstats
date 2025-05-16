"use client";

import { StatisticsContext, type StatisticsContextType } from '@/contexts/StatisticsContext';
import { ReactNode, useMemo, useState } from 'react';

export default function StatisticsProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<StatisticsContextType["db"]>(null);

  const values = useMemo<StatisticsContextType>(() => {
    return { db, setDb };
  }, [db]);

  return (
    <StatisticsContext.Provider value={values}>
      {children}
    </StatisticsContext.Provider>
  );
}
