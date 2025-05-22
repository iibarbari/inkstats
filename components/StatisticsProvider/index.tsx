"use client";

import { StatisticsContext, type StatisticsContextType } from '@/contexts/StatisticsContext';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import initSqlJs, { Database } from "sql.js";
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

export default function StatisticsProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<StatisticsContextType["file"]>(null);
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    if (!file) return;

    async function loadDatabase() {
      try {
        const SQL = await initSqlJs({
          locateFile: filename => `/sql-wasm.wasm`
        });
        setDb(new SQL.Database(file));
      } catch (err) {
        console.error(err, "err");
      }
    }

    loadDatabase();
  }, [file]);


  const values = useMemo<StatisticsContextType>(() => {
    return { file, setFile, db };
  }, [file, db]);

  return (
    <StatisticsContext.Provider value={values}>
      {children}
    </StatisticsContext.Provider>
  );
}
