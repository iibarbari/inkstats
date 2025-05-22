"use client";

import { createContext, Dispatch, SetStateAction } from 'react';
import { Database } from 'sql.js';

export type StatisticsContextType = {
  file: Uint8Array | null;
  db: Database | null;
  setFile: Dispatch<SetStateAction<StatisticsContextType["file"]>>
}

export const StatisticsContext = createContext<StatisticsContextType>({
  db: null,
  file: null,
  setFile: () => null,
});
