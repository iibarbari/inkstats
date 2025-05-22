"use client";

import { useContext } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import dynamic from 'next/dynamic';

const FileUploadForm = dynamic(() => import("@/components/FileUploadForm"), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function ClientEntry() {
  const { file } = useContext(StatisticsContext);

  if (file === null) {
    return (
      <>
        <section className="container">
          <FileUploadForm />
        </section>

        <section className="container">
          <h2>How to get your reading statistics file:</h2>
          <ol>
            <li>Connect your Kindle device to your computer using a USB cable</li>

            <li>Navigate to the internal storage of your Kindle</li>

            <li>Look for the folder named "system" or ".sdr"</li>

            <li>Find the file named "statistics.sqlite" or "cr.db"</li>

            <li>Copy this file to your computer</li>

            <li>Upload the file above</li>
          </ol>
        </section>
      </>
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
