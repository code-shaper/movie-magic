import { MovieList } from './MovieList';
import { movies } from '@/mocks/movies';
import { render, screen } from '@/test/test-utils';

describe('<MovieList />', () => {
  it('should render correctly', () => {
    render(<MovieList movies={movies} />);

    // expect the correct number of movie items
    const movieList = screen.getByTestId('movie-list');
    const movieItems = movieList.querySelectorAll('tbody tr');
    expect(movieItems).toHaveLength(movies.length);
  });
});
