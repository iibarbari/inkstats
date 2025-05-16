"use client";

import { lazy, Suspense, useContext } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';

const FileUploadForm = lazy(() => import("@/components/FileUploadForm"));

export default function Home() {
  const { db } = useContext(StatisticsContext);

  if (db === null) {
    return (
      <Suspense>
        <main className="grid gap-12 my-16">
          <FileUploadForm />
        </main>
      </Suspense>
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
