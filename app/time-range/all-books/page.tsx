"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import { ColumnDef } from '@tanstack/react-table';
import { Book } from '@/@types';
import { DataTable } from '@/components/DataTable';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export type BookDetail = Pick<Book, 'id' | 'title' | 'total_read_time'>;

const columns: ColumnDef<BookDetail>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title: string = row.getValue("title");
      return <span title={title}>{title}</span>;
    }
  },
  {
    accessorKey: "total_read_time",
    header: "Total read time",
    cell: ({ row }) => {
      const totalReadTime: number = row.getValue("total_read_time");

      return dayjs.duration(totalReadTime, 'seconds').format("HH:mm:ss");
    },
  },
];

export default function AllBooksPage() {
  const { db } = useContext(StatisticsContext);
  const [data, setData] = useState<Array<BookDetail>>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const fetchData = useCallback(() => {
    if (!db) return;

    const offset = pageIndex * pageSize;
    const query = `
        SELECT id, title, coalesce(total_read_time, 0)
        FROM book
        ORDER BY last_open DESC
        LIMIT ${pageSize} OFFSET ${offset}`;

    const result = db.exec(query);
    if (result.length === 0) {
      setData([]);
      return;
    }

    const newData = result[0].values.map((row) => ({
      id: row[0] as number,
      title: row[1] as string,
      total_read_time: row[2] as number,
    })) as Array<BookDetail>;

    setData(newData);
  }, [db, pageIndex]);

  const totalBooks = useMemo<number>(() => {
    if (db == null) return 0;

    const countQuery = `
        SELECT COUNT(id) as total
        FROM book`;

    const result = db.exec(countQuery);

    if (result.length > 0 && result[0].values.length > 0) {
      return result[0].values[0][0] as number;
    } else {
      return 0;
    }
  }, [db]);

  const totalTimeSpentReading = useMemo(() => {
    if (db == null) return 0;

    const timeQuery = `
        SELECT SUM(total_read_time) as total_time
        FROM book`;

    const result = db.exec(timeQuery);

    if (result.length > 0 && result[0].values.length > 0) {
      return result[0].values[0][0] as number;
    } else {
      return 0;
    }
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [db, pageIndex, fetchData]);

  return (
    <main className="flex-grow-1 flex flex-col gap-12 my-16">
      <section className="container">
        <h1 className="text-2xl font-bold mb-4">All Books</h1>

        <p className="text-muted-foreground mb-4">
          Total time spent reading: {dayjs.duration(totalTimeSpentReading, 'seconds').format("HH:mm:ss")}
        </p>
      </section>

      <section className="container">
        <DataTable
          data={data}
          columns={columns}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
          pageCount={Math.ceil(totalBooks / pageSize)}
        />
      </section>
    </main>
  );
}
