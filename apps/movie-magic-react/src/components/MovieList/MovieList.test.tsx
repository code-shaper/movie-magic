import { MovieList } from './MovieList';
import { render, screen } from '../../test/test-utils';

const movies = [
  {
    id: '65667a66-d848-4eba-a2ca-c167c39d8f57',
    name: 'The Shawshank Redemption',
    year: 1994,
    rating: 9.3,
  },
  {
    id: '116dac8b-e75b-4abb-8da3-4f72e2274e50',
    name: 'The Godfather',
    year: 1972,
    rating: 9.2,
  },
  {
    id: '2fd1e450-6622-43b7-977f-2640a48cb032',
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
