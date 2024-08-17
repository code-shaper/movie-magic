import type { MoviesRequest } from '@/generated/gql/graphql';
import { MoviesRequestHelper as mrh } from '@/lib/MoviesRequestHelper';
import * as React from 'react';

// ---------- MoviesRequestContext ----------
type MoviesRequestSetter = (moviesRequest: MoviesRequest) => void;

const MoviesRequestContext = React.createContext<
  | { moviesRequest: MoviesRequest; setMoviesRequest: MoviesRequestSetter }
  | undefined
>(undefined);

// ---------- MoviesRequestContextProvider ----------
interface MoviesRequestContextProviderProps {
  initialState?: MoviesRequest;
  children?: React.ReactNode;
}

function MoviesRequestContextProvider({
  initialState = mrh.newMoviesRequest(),
  children,
}: MoviesRequestContextProviderProps) {
  const [moviesRequest, setMoviesRequest] =
    React.useState<MoviesRequest>(initialState);

  const value = { moviesRequest, setMoviesRequest };
  return (
    <MoviesRequestContext.Provider value={value}>
      {children}
    </MoviesRequestContext.Provider>
  );
}

// ---------- useMoviesRequestContext ----------
function useMoviesRequestContext() {
  const moviesRequestContext = React.useContext(MoviesRequestContext);
  /* istanbul ignore next */
  if (moviesRequestContext === undefined) {
    throw new Error(
      'useMoviesRequestContext must be used within a MoviesRequestContextProvider',
    );
  }
  return moviesRequestContext;
}

export { MoviesRequestContextProvider, useMoviesRequestContext };
