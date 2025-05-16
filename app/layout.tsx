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
  title: "KOReader Reading Statistics Viewer",
  description: "This is a simple viewer for KOReader reading statistics. It is not affiliated with the KOReader project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
