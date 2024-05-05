import { MovieList } from './MovieList';
import { movies } from '@/mocks/movies';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/MovieList',
  component: MovieList,
  tags: ['autodocs'],
  argTypes: {
    movies: { control: false },
  },
} satisfies Meta<typeof MovieList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    movies,
  },
} satisfies Story;
