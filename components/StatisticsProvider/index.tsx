"use client";

import { StatisticsContext, type StatisticsContextType } from '@/contexts/StatisticsContext';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import initSqlJs, { Database } from "sql.js";
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

export default function StatisticsProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<StatisticsContextType["file"]>(null);
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !file) {
      fetch("/statistics.sqlite3")
        .then(res => res.arrayBuffer())
        .then(buf => setFile(new Uint8Array(buf)));
    }
  }, [file]);

  useEffect(() => {
    if (!file) return;

    async function loadDatabase() {
      try {
        const SQL = await initSqlJs({
          locateFile: () => `/sql-wasm.wasm`
        });
        setDb(new SQL.Database(file));
      } catch (err) {
        console.error(err, "err");
      }
    }

    loadDatabase();
  }, [file]);

  const resetDb = useCallback(() => {
    if (db) {
      db.close();

      setDb(null);
      setFile(null);
    }
  }, [db]);

  const values = useMemo<StatisticsContextType>(() => {
    return { file, setFile, db, resetDb };
  }, [file, db, resetDb]);

  return (
    <StatisticsContext.Provider value={values}>
      {children}
    </StatisticsContext.Provider>
  );
}
