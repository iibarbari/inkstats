"use client";

import { createContext, Dispatch, SetStateAction } from 'react';

export type StatisticsContextType = {
  file: Uint8Array | null;
  setFile: Dispatch<SetStateAction<StatisticsContextType["file"]>>
}

export const StatisticsContext = createContext<StatisticsContextType>({
  file: null,
  setFile: () => null,
});
