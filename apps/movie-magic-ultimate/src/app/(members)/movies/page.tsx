import { Toolbar } from './_components/Toolbar';
import { Icons } from '@/components/Icons';
import { graphql } from '@/generated/gql';
import { getClient } from '@/lib/apollo-client';
import type { SearchParams } from '@/lib/converters';
import {
  formatCertificateRating,
  formatGenre,
  searchParamsToMovieRequest,
} from '@/lib/converters';
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
      pageInfo {
        totalItems
        ...ToolbarInfo
      }
    }
  }
`);

type Movie = ResultOf<typeof moviesPageDocument>['movies']['movies'][0];

interface MovieComponentProps {
  movie: Movie;
}

function MovieListHeader() {
  return (
    <header className="sticky top-14 z-50 hidden w-full border-b bg-background sm:top-28 sm:block">
      <div className="flex items-center gap-x-3 px-2 py-3 text-sm leading-none text-muted-foreground">
        <div className="mr-2 hidden w-8 shrink-0 text-right sm:block">#</div>
        <div className="w-16 flex-1 shrink-0 ">Title</div>
        <div className="hidden w-12 shrink-0 text-center sm:block">Rating</div>
        <div className="hidden w-12 shrink-0 text-right sm:block">Year</div>
        <div className="hidden w-12 shrink-0 text-right sm:block">Runtime</div>
      </div>
    </header>
  );
}

function MovieRank({ movie }: MovieComponentProps) {
  return (
    <div className="mr-2 hidden w-8 shrink-0 text-right text-base sm:block">
      {movie.rank}
    </div>
  );
}

function MovieImage({ movie }: MovieComponentProps) {
  return movie.image ? (
    <div className="relative flex h-24 w-16 shrink-0 overflow-hidden rounded-md">
      <Image
        alt={movie.name}
        className="aspect-[2/3] w-full object-cover"
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
   *   1. min-w-0: allow the flex item to shrink below content size
   *   2. overflow-hidden: Ensure content doesn't overflow
   */
  return (
    <div className="mr-6 min-w-0 flex-1 overflow-hidden">
      <p className="line-clamp-2 text-base leading-5 text-accent-foreground">
        {movie.name}
      </p>
      <div className="flex items-center gap-x-1">
        {movie.genres.map((genre, index) => (
          <React.Fragment key={index}>
            <p>{formatGenre(genre)}</p>
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
      {formatCertificateRating(movie.certificate.rating)}
    </div>
  );
}

function MovieReleaseYear({ movie }: MovieComponentProps) {
  return (
    <div className="hidden w-12 shrink-0 text-right sm:block">
      {movie.releaseYear}
    </div>
  );
}

function MovieRuntime({ movie }: MovieComponentProps) {
  return (
    <div className="hidden w-12 shrink-0 text-right sm:block">
      {formatDuration(movie.runtime)}
    </div>
  );
}

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
      <div className="relative w-full overflow-auto py-2">
        {movies.map((movie) => (
          <div
            className="flex items-center gap-x-3 rounded-md p-2 text-sm text-muted-foreground hover:bg-muted/50"
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
    </>
  );
}
