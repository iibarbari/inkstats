import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
import isYesterday from 'dayjs/plugin/isYesterday';
import { SiteHeader } from '@/components/Header';
import StatisticsProvider from '@/components/StatisticsProvider';
import { ReactNode } from 'react';

dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.extend(isYesterday);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "inkstats",
  description: "inkstats is a simple viewer for KOReader reading statistics. It is not affiliated with the KOReader project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>"
    />
    <body
      className={`${inter.variable} antialiased`}
    >
    <StatisticsProvider>
      <SiteHeader />
      {children}
    </StatisticsProvider>
    </body>
    </html>
  );
}
