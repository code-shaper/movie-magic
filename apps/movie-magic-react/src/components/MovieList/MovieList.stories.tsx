import { MovieList } from './MovieList';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/MovieList',
  component: MovieList,
  tags: ['autodocs'],
  argTypes: {
    movies: {
      description: 'A list of movies',
    },
  },
} satisfies Meta<typeof MovieList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    movies: [
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
    ],
  },
} satisfies Story;
