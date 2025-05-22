"use client";
import Link from 'next/link';
import { useContext } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import { Button } from '@/components/ui/button';
import { UploadIcon } from 'lucide-react';

export function SiteHeader() {
  const { db, resetDb } = useContext(StatisticsContext);

  return (
    <header
      className="flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear py-1"
    >
      <div className="container flex w-full items-center gap-1 px-4 gap-2 py-4 flex-wrap">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight">📖 inkstats</h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            A simple viewer for KOReader reading statistics.
          </p>
        </Link>

        {db !== null && (
          <div className="flex-1 flex sm:justify-end">
            <Button variant="outline" onClick={() => resetDb()}>
              <UploadIcon className="mr-2 h-4 w-4" />

              Upload new file
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
