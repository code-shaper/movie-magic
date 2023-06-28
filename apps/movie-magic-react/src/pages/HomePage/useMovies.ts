import type { Movie } from '@/models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetchMovies(): Promise<Movie[]> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const resMovies = await axios.get<Movie[]>(`${apiUrl}/top-10-movies`);

  return resMovies.data;
}

export function useMovies() {
  return useQuery(['movies'], fetchMovies);
}
