import { MovieList } from '@/components/MovieList';
import type { MoviePagination, QueryParams } from '@/models';
import { queryParamsToSearchParams, SortParam } from '@/models';
import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';

async function fetchMovies(queryParams: QueryParams): Promise<MoviePagination> {
  const searchParamsString = queryParamsToSearchParams(queryParams);
  const resMovies = await api.get<MoviePagination>(
    `/movies?${searchParamsString}`
  );
  return resMovies.data;
}

const baseStyles = 'container relative mx-auto max-w-screen-xl px-8 py-4';

export function HomePage() {
  const top10QueryParams: QueryParams = {
    sort: SortParam.RANK_ASC,
    pageSpec: {
      page: 1,
      perPage: 10,
    },
  };

  // query for top 10 movies
  const { data, error, isLoading } = useQuery({
    queryKey: ['movies', top10QueryParams],
    queryFn: async () => fetchMovies(top10QueryParams),
  });

  if (isLoading) {
    return <div className={baseStyles}>Loading...</div>;
  }

  if (error || !data) {
    return (
      <div className={baseStyles}>
        Error: {error ? error.message : 'Movies not found'}
      </div>
    );
  }

  return (
    <div className={clsx(baseStyles, 'space-y-2')}>
      <h1 className="text-xl font-semibold tracking-tight">
        Top 10 Movies Of All Time
      </h1>
      <MovieList movies={data.movies} />
    </div>
  );
}
