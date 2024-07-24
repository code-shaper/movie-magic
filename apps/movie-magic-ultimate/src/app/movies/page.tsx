import { Icons } from '@/components/Icons';
import { graphql } from '@/generated/gql';
import { getClient } from '@/lib/apollo-client';
import { convertCertificateRating, convertGenre } from '@/lib/converters';
import { formatDuration } from '@/lib/utils';
import type { ResultOf } from '@graphql-typed-document-node/core';
import Image from 'next/image';
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
        name
        certificate {
          rating
        }
        genres
        image {
          url
          width
          height
        }
        rank
        releaseYear
        runtime
      }
    }
  }
`);

type Movie = ResultOf<typeof moviesPageDocument>['movies']['movies'][0];

interface MovieComponentProps {
  movie: Movie;
}

function MovieRank({ movie }: MovieComponentProps) {
  return (
    <div className="mr-2 w-8 shrink-0 text-right text-base">{movie.rank}</div>
  );
}

function MovieImage({ movie }: MovieComponentProps) {
  return movie.image ? (
    <div className="relative flex size-10 shrink-0 overflow-hidden rounded-md">
      <Image
        alt={movie.name}
        className="aspect-square size-full object-cover"
        height={movie.image.height}
        src={movie.image.url}
        width={movie.image.width}
      />
    </div>
  ) : (
    <Icons.image className="size-10 shrink-0" />
  );
}

function MovieTitle({ movie }: MovieComponentProps) {
  /*
   * The following styles are necessary to prevent the title from expanding
   * to its content size. Without these, the `truncate` is ineffective.
   *
   * min-w-0: allow the flex item to shrink below content size
   * overflow-hidden: Ensure content doesn't overflow
   */
  return (
    <div className="mr-6 min-w-0 flex-1 overflow-hidden">
      <p className="truncate text-base leading-5 text-accent-foreground">
        {movie.name}
      </p>
      <div className="flex items-center gap-x-1">
        {movie.genres.map((genre, index) => (
          <React.Fragment key={index}>
            <p>{convertGenre(genre)}</p>
            {index < movie.genres.length - 1 && (
              <Icons.dot className="size-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function MovieRating({ movie }: MovieComponentProps) {
  return (
    <div className="hidden w-12 shrink-0 text-center sm:block">
      {convertCertificateRating(movie.certificate.rating)}
    </div>
  );
}

function MovieReleaseYear({ movie }: MovieComponentProps) {
  return (
    <div className="hidden w-12 shrink-0 text-right md:block">
      {movie.releaseYear}
    </div>
  );
}

function MovieRuntime({ movie }: MovieComponentProps) {
  return (
    <div className="hidden w-12 shrink-0 text-right md:block">
      {formatDuration(movie.runtime)}
    </div>
  );
}

export default async function MoviesPage() {
  const { data } = await getClient().query({
    query: moviesPageDocument,
    variables: { input: {} },
  });
  const { movies: moviesResponse } = data;

  return (
    <div className="container relative mx-auto max-w-screen-lg p-4 sm:px-8">
      <div className="relative w-full overflow-auto">
        {moviesResponse.movies.map((movie) => (
          <div
            className="flex items-center gap-x-3 rounded-md py-2 text-sm text-muted-foreground hover:bg-muted/50"
            key={movie.id}
          >
            <MovieRank movie={movie} />
            <MovieImage movie={movie} />
            <MovieTitle movie={movie} />
            <MovieRating movie={movie} />
            <MovieReleaseYear movie={movie} />
            <MovieRuntime movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
