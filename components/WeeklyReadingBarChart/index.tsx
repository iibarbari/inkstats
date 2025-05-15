"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts';
import { BookOpenTextIcon, TimerIcon } from 'lucide-react';
import { JSX, PropsWithoutRef, useEffect, useState } from 'react';
import dayjs from 'dayjs';

const chartConfig = {
  minutes: {
    label: "Minutes",
    color: "#2563eb",
    icon: TimerIcon,
  },
  pages: {
    label: "Pages",
    color: "#60a5fa",
    icon: BookOpenTextIcon,
  },
} satisfies ChartConfig;

type Props = PropsWithoutRef<JSX.IntrinsicElements["div"]>;

type ChartData = {
  day: string;
  minutes: number;
  pages: number;
}

export default function WeeklyReadingBarChart({ ...props }: Props) {
  const [data, setData] = useState<Array<ChartData>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchWeeklyReadingData() {
      const res = await fetch("/api/weekly-reading-stats");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setData(data);
    }

    setIsLoading(true);

    fetchWeeklyReadingData()
      .then(() => setIsLoading(false))
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Something unexpacted happened</p>
      </div>
    );
  }

  return (
    <ChartContainer {...props} config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />

        <ChartTooltip content={<ChartTooltipContent />} />

        <ChartLegend content={<ChartLegendContent />} />

        <Bar dataKey="minutes" fill="var(--color-minutes)" radius={4} />

        <Bar dataKey="pages" fill="var(--color-pages)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
