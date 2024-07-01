import { HomePage, loader as moviesLoader } from './routes/home';
import { RootLayout } from './routes/root';
import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        loader: moviesLoader,
      },
    ],
  },
];
