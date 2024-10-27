import { MovieItem } from './MovieItem';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';

/*
 * "fragment MovieList" generates:
 *   1. MovieListFragment
 *   2. MovieListFragmentDoc
 */
const MovieListFragment = graphql(/* GraphQL */ `
  fragment MovieList on MoviesResponse {
    movies {
      id
      ...MovieItem
    }
  }
`);

type MovieListProps = {
  moviesResponse: FragmentType<typeof MovieListFragment>;
};

export function MovieList({
  moviesResponse: moviesResponseProp,
}: MovieListProps) {
  const moviesResponse = getFragmentData(MovieListFragment, moviesResponseProp);

  return (
    <ul className="relative w-full overflow-auto py-2">
      {moviesResponse.movies.map((movie) => (
        <li key={movie.id}>
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  );
}
