import { api } from '@/utils/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

// Create a react-query client
const queryClient = new QueryClient();

export interface QueryProviderProps {
  baseApiUrl: string;
  children?: React.ReactNode;
}

export function QueryProvider({ baseApiUrl, children }: QueryProviderProps) {
  useEffect(() => {
    api.defaults.baseURL = baseApiUrl;
  }, [baseApiUrl]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
