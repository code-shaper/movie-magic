import { Icons } from '@/components/Icons';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { formatCertificateRating, formatGenre } from '@/lib/converters';
import { formatDuration } from '@/lib/utils';
import Image from 'next/image';
import * as React from 'react';

/*
 * "fragment MovieItem" generates:
 *   1. MovieItemFragment
 *   2. MovieItemFragmentDoc
 */
const MovieItemFragment = graphql(/* GraphQL */ `
  fragment MovieItem on Movie {
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
`);

export interface MovieItemProps {
  movie: FragmentType<typeof MovieItemFragment>;
}

function MovieRank({ movie: movieProp }: MovieItemProps) {
  const movie = getFragmentData(MovieItemFragment, movieProp);

  return (
    <div className="mr-2 hidden w-8 shrink-0 text-right text-base sm:block">
      {movie.rank}
    </div>
  );
}

function MovieImage({ movie: movieProp }: MovieItemProps) {
  const movie = getFragmentData(MovieItemFragment, movieProp);

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

function MovieTitle({ movie: movieProp }: MovieItemProps) {
  const movie = getFragmentData(MovieItemFragment, movieProp);

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

function MovieRating({ movie: movieProp }: MovieItemProps) {
  const movie = getFragmentData(MovieItemFragment, movieProp);

  return (
    <div className="hidden w-12 shrink-0 text-center sm:block">
      {formatCertificateRating(movie.certificate.rating)}
    </div>
  );
}

function MovieReleaseYear({ movie: movieProp }: MovieItemProps) {
  const movie = getFragmentData(MovieItemFragment, movieProp);

  return (
    <div className="hidden w-12 shrink-0 text-right sm:block">
      {movie.releaseYear}
    </div>
  );
}

function MovieRuntime({ movie: movieProp }: MovieItemProps) {
  const movie = getFragmentData(MovieItemFragment, movieProp);

  return (
    <div className="hidden w-12 shrink-0 text-right sm:block">
      {formatDuration(movie.runtime)}
    </div>
  );
}

export function MovieItem({ movie: movieProp }: MovieItemProps) {
  const movie = getFragmentData(MovieItemFragment, movieProp);

  return (
    <li
      className="flex items-center gap-x-3 rounded-md p-2 text-sm text-muted-foreground hover:bg-muted/50"
      key={movie.id}
    >
      <MovieRank movie={movieProp} />
      <MovieImage movie={movieProp} />
      <MovieTitle movie={movieProp} />
      <MovieRating movie={movieProp} />
      <MovieReleaseYear movie={movieProp} />
      <MovieRuntime movie={movieProp} />
    </li>
  );
}
