'use client';

import { MovieItem } from './MovieItem';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { useState, useEffect, useRef } from 'react';

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const navigateToMovie = (movieId: string) => {
    console.log('Navigating to movie:', movieId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const lastIndex = moviesResponse.movies.length - 1;
    const selectedMovie = moviesResponse.movies[selectedIndex];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, lastIndex));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setSelectedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setSelectedIndex(lastIndex);
        break;
      case 'Enter':
        e.preventDefault();
        navigateToMovie(selectedMovie.id);
        break;
    }
  };

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, moviesResponse.movies.length);
  }, [moviesResponse.movies]);

  useEffect(() => {
    itemRefs.current[selectedIndex]?.focus();
  }, [selectedIndex]);

  return (
    <ul
      aria-label="Movies list"
      className="relative w-full overflow-auto py-2"
      onKeyDown={handleKeyDown}
      role="listbox"
    >
      {moviesResponse.movies.map((movie, index) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <li
          aria-selected={index === selectedIndex}
          className={`cursor-pointer outline-none ${
            index === selectedIndex
              ? 'focus-visible:ring-2 focus-visible:ring-primary'
              : ''
          }`}
          key={movie.id}
          onClick={() => {
            navigateToMovie(movie.id);
          }}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          role="option"
          tabIndex={index === selectedIndex ? 0 : -1}
        >
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  );
}
