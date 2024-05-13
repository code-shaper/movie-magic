import type { Movie } from '@/models';
import { clsx } from 'clsx';

export interface MovieListProps {
  /** Movies to be displayed */
  movies: Movie[];
}

const headStyles = 'py-3.5 text-sm font-semibold';

const cellStyles = 'py-4 text-sm';

export function MovieList({ movies }: MovieListProps) {
  return (
    <table className="min-w-full divide-y" data-testid="movie-list">
      <thead>
        <tr>
          <th className={clsx(headStyles, 'text-center')}>Rank</th>
          <th className={clsx(headStyles, 'px-3 text-left')}>Name</th>
          <th className={clsx(headStyles, 'px-3 text-center')}>Year</th>
          <th className={clsx(headStyles, 'text-center')}>Rating</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr className="even:bg-gray-50" key={movie.id}>
            <td className={clsx(cellStyles, 'text-center')}>{movie.rank}</td>
            <td className={clsx(cellStyles, 'px-3')}>{movie.name}</td>
            <td className={clsx(cellStyles, 'px-3 text-center')}>
              {movie.releaseYear}
            </td>
            <td className={clsx(cellStyles, 'text-center')}>
              {new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }).format(movie.ratingsSummary.aggregateRating)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
