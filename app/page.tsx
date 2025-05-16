"use client";

import { useContext } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import dynamic from 'next/dynamic';

const FileUploadForm = dynamic(() => import("@/components/FileUploadForm"), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function Home() {
  const { db } = useContext(StatisticsContext);

  if (db === null) {
    return (
      <main className="grid gap-12 my-16">
        <section className="container">
          <FileUploadForm />
        </section>
      </main>
    );
  }

  return (
    <main className="grid gap-12 my-16">
      <div className="container">
        hello
      </div>
    </main>
  );
}
