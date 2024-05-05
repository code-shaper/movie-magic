import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a react-query client
const queryClient = new QueryClient();

export interface QueryProviderProps {
  children?: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
