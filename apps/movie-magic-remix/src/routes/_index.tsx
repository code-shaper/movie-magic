import { MovieList } from '@/components/MovieList';
import { getMovies } from '@/data/movies';
import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => [
  { title: 'Movie Magic Remix' },
  { name: 'description', content: 'Movie Magic Remix' },
];

/**
 * provides list of movies to the page
 */
export const loader = async () => {
  const movies = await getMovies();
  return json({ movies });
};

export default function Index() {
  // get the list of movies from the loader
  const { movies } = useLoaderData<typeof loader>();

  return (
    <div className="container relative mx-auto max-w-screen-xl px-8 py-4 space-y-2">
      <h1 className="text-xl font-semibold tracking-tight">
        Top 10 Movies Of All Time
      </h1>
      <MovieList movies={movies} />
    </div>
  );
}
