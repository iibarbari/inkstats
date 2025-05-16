"use client";

import { createContext, Dispatch, SetStateAction } from 'react';

export type StatisticsContextType = {
  db: Uint8Array | null;
  setDb: Dispatch<SetStateAction<StatisticsContextType["db"]>>
}

export const StatisticsContext = createContext<StatisticsContextType>({
  db: null,
  setDb: () => null,
});
