import { MovieList } from '@/components/MovieList';
import type { MoviePagination, QueryParams } from '@/models';
import { queryParamsToSearchParams, SortParam } from '@/models';
import { clsx } from 'clsx';
import { useLoaderData } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL as string;

export async function loader() {
  const top10QueryParams: QueryParams = {
    sort: SortParam.RANK_ASC,
    pageSpec: {
      page: 1,
      perPage: 10,
    },
  };
  const searchParamsString = queryParamsToSearchParams(top10QueryParams);
  return fetch(`${API_URL}/movies?${searchParamsString}`);
}

const baseStyles = 'container relative mx-auto max-w-screen-xl px-8 py-4';

export function HomePage() {
  const data = useLoaderData() as MoviePagination;

  return (
    <div className={clsx(baseStyles, 'space-y-2')}>
      <h1 className="text-xl font-semibold tracking-tight">
        Top 10 Movies Of All Time
      </h1>
      <MovieList movies={data.movies} />
    </div>
  );
}
