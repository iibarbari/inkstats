"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/DataTable';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type TableData = {
  week_number: string;
  total_read_time: number;
  total_read_pages: number;
}

const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: "week_number",
    header: "Week",
  },
  {
    accessorKey: "total_read_time",
    header: "Total read time",
    cell: ({ row }) => {
      const totalReadTime: number = row.getValue("total_read_time");

      return dayjs.duration(totalReadTime, 'seconds').format("HH:mm:ss");
    }
  },
  {
    accessorKey: "total_read_pages",
    header: "Total read pages",
  },
];

export default function BooksByWeekPage() {
  const { db } = useContext(StatisticsContext);
  const [data, setData] = useState<Array<TableData>>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const fetchData = useCallback(() => {
    if (!db) return;

    const offset = pageIndex * pageSize;

    const query = `
        SELECT strftime('%Y Week %W', datetime(start_time, 'unixepoch', 'localtime')) AS week,
               SUM(duration)                                                          AS total_duration,
               COUNT(DISTINCT page || '-' || id_book)                                 AS total_read_pages
        FROM page_stat_data
        GROUP BY week
        ORDER BY week desc
        LIMIT ${pageSize} OFFSET ${offset}
    `;

    const { values } = db.exec(query)[0];

    const temp: Array<TableData> = values.map((res) => {
      return {
        week_number: res[0] as string,
        total_read_time: res[1] as number,
        total_read_pages: res[2] as number,
      };
    });

    setData(temp);
  }, [db, pageIndex]);

  const totalWeeks = useMemo<number>(() => {
    if (db == null) return 0;

    const countQuery = `
        SELECT COUNT(DISTINCT strftime('%Y Week %W', datetime(start_time, 'unixepoch', 'localtime'))) AS total
        FROM page_stat_data
    `;

    const result = db.exec(countQuery);
    return result[0].values[0][0] as number;
  }, [db]);


  useEffect(() => {
    fetchData();
  }, [db, pageIndex, fetchData]);

  return (
    <main className="flex-grow-1 flex flex-col gap-12 my-16">
      <section className="container">
        <h1 className="text-2xl font-bold mb-4">Books by week</h1>
      </section>

      <section className="container">
        <DataTable
          data={data}
          columns={columns}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
          pageCount={Math.ceil(totalWeeks / pageSize)}
        />
      </section>
    </main>
  );
}
