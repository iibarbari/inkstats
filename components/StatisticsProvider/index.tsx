"use client";

import { StatisticsContext, type StatisticsContextType } from '@/contexts/StatisticsContext';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import initSqlJs, { Database } from "sql.js";

export default function StatisticsProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<StatisticsContextType["file"]>(null);
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    if (!file) return;

    async function loadDatabase() {
      try {
        const SQL = await initSqlJs({
          locateFile: filename => `/sql-wasm.wasm`
          // locateFile: (file: string) => `https://sql.js.org/dist/${file}`
        });
        setDb(new SQL.Database(file));
      } catch (err) {
        console.error(err, "err");
      }
    }

    loadDatabase();
  }, [file]);

  useEffect(() => {
    if (db === null) {
      console.error("Database is null");
      return;
    }

    console.log("hello");

    const result = db.exec("SELECT * FROM book");

    console.log(result, "result");
  }, [db]);

  const values = useMemo<StatisticsContextType>(() => {
    return { file, setFile };
  }, [file]);

  return (
    <StatisticsContext.Provider value={values}>
      {children}
    </StatisticsContext.Provider>
  );
}
