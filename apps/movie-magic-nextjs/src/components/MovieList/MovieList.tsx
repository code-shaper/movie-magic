import type { Movie } from '@/models';
import { Button } from '@movie-magic/ui-lib';

async function getMovies(): Promise<Movie[]> {
  const { API_URL } = process.env;
  const url = `${API_URL}/top-10-movies`;
  console.log('----> HTTP GET', url);
  // ----- Cached Data -----
  const resMovies = await fetch(url);
  return resMovies.json() as Promise<Movie[]>;
}

export async function MovieList() {
  const movies = await getMovies();

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
        {movies.map((movie: Movie, index: number) => (
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
