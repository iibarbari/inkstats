import { ReactNode } from 'react';

interface Book {
  id: number;
  title: string;
  authors: string;
  last_open: Date;
  highlights: number;
  notes: number;
  pages: number;
  language: string;
  total_read_time: number;
  total_read_pages: number;
}


type Stat = {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    status: "positive" | "negative" | "neutral";
  };
}
