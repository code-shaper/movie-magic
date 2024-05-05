'use client';

import { QueryProvider } from './QueryProvider';
import { useMockServiceWorker } from './useMockServiceWorker';

export interface AppProviderProps {
  baseApiUrl: string;
  useMockData: boolean;
  children?: React.ReactNode;
}

export function AppProvider({
  baseApiUrl,
  useMockData,
  children,
}: AppProviderProps) {
  const hasWorkerStarted = useMockServiceWorker(useMockData);
  if (!hasWorkerStarted) {
    return undefined;
  }

  return <QueryProvider baseApiUrl={baseApiUrl}>{children}</QueryProvider>;
}
