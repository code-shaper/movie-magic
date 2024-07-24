'use client';

import { ThemeProvider } from 'next-themes';

export interface AppProviderProps {
  baseApiUrl: string;
  children?: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
