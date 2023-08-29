import { MovieList } from './MovieList';
import { render, screen } from '../../test/test-utils';

const movies = [
  {
    id: '1001',
    name: 'The Shawshank Redemption',
    year: 1994,
    rating: 9.3,
  },
  {
    id: '1002',
    name: 'The Godfather',
    year: 1972,
    rating: 9.2,
  },
  {
    id: '1003',
    name: 'The Godfather: Part II',
    year: 1974,
    rating: 9.0,
  },
];

describe('<MovieList />', () => {
  it('should renders correctly', async () => {
    render(<MovieList movies={movies} />);

    // expect 3 movies
    const movieTable = await screen.findByTestId('movie-table');
    const movieRows = movieTable.querySelectorAll('tbody tr');
    expect(movieRows).toHaveLength(movies.length);
  });
});
