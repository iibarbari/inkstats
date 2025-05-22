"use client";

import { useContext } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import dynamic from 'next/dynamic';
import SummaryCards from '@/components/SummaryCards';
import WeeklyReadingBarChart from '@/components/WeeklyReadingBarChart';

const FileUploadForm = dynamic(() => import("@/components/FileUploadForm"), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function ClientEntry() {
  const { db } = useContext(StatisticsContext);

  if (db === null) {
    return (
      <>
        <section className="container">
          <FileUploadForm />
        </section>
      </>
    );
  }

  return (
    <>
      <section className="container mb-16">
        <SummaryCards />
      </section>

      <section className="container grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
        <WeeklyReadingBarChart />
      </section>
    </>
  );
}
