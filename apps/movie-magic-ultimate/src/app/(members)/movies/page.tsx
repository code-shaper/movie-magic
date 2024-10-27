import { MovieItem } from './_components/MovieItem';
import { MovieListHeader } from './_components/MovieListHeader';
import { Toolbar } from './_components/Toolbar';
import { graphql } from '@/generated/gql';
import { getClient } from '@/lib/apollo-client';
import type { SearchParams } from '@/lib/converters';
import { searchParamsToMovieRequest } from '@/lib/converters';
import * as React from 'react';

/*
 * Disable server-side full route cache
 * See https://nextjs.org/docs/app/building-your-application/caching#opting-out-2
 */
export const dynamic = 'force-dynamic';

/*
 * "query moviesPage" generates:
 *   1. MoviesPageQuery
 *   2. MoviesPageQueryVariables
 *   3. MoviesPageDocument
 */
const moviesPageDocument = graphql(/* GraphQL */ `
  query moviesPage($input: MoviesRequest!) {
    movies(input: $input) {
      movies {
        id
        ...MovieItem
      }
      pageInfo {
        totalItems
        ...ToolbarInfo
      }
    }
  }
`);

interface MoviesPageProps {
  searchParams: SearchParams;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const moviesRequest = searchParamsToMovieRequest(searchParams);
  const { data } = await getClient().query({
    query: moviesPageDocument,
    variables: { input: moviesRequest },
  });
  const { movies: moviesResponse } = data;
  const { movies, pageInfo } = moviesResponse;

  return (
    <>
      <Toolbar moviesRequest={moviesRequest} toolbarInfo={pageInfo} />
      <MovieListHeader />
      <ul className="relative w-full overflow-auto py-2">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
}
