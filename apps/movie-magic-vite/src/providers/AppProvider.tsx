import { QueryProvider } from './QueryProvider';
import { BrowserRouter as Router } from 'react-router-dom';

export interface AppProviderProps {
  children?: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryProvider>
      <Router>{children}</Router>
    </QueryProvider>
  );
}
