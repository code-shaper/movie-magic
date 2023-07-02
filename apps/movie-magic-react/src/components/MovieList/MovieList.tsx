import type { Movie } from '@/models';
import { Button } from '@movie-magic/ui-lib';

export interface MovieListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  return (
    <table data-testid="movie-table">
      <thead>
        <tr>
          <th className="text-center">Rank</th>
          <th>Name</th>
          <th className="text-center">Year</th>
          <th className="text-center">Rating</th>
          <td />
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => (
          <tr key={movie.id}>
            <td className="text-center">{index + 1}</td>
            <td>{movie.name}</td>
            <td className="text-center">{movie.year}</td>
            <td className="text-center">{movie.rating.toFixed(1)}</td>
            <td className="text-center">
              <Button>Watch</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
