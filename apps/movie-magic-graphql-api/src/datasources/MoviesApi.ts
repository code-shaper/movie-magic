import moviesData from './movies.json';
import { MovieSortSpec } from '@/generated/resolvers-types';
import type {
  Certificate,
  Genre,
  Image,
  MovieRatingsSummary,
  MoviesRequest,
  PaginationInfo,
} from '@/generated/resolvers-types';

interface DbCastMember {
  personId: string;
  characters?: string[];
}

interface DbMovie {
  cast: DbCastMember[];
  certificate: Certificate;
  description: string;
  directorIds: string[];
  genres: Genre[];
  id: string;
  image?: Image;
  isFeatured: boolean;
  name: string;
  rank: number;
  ratingsSummary: MovieRatingsSummary;
  releaseYear: number;
  runtime: number;
  tagline?: string;
  writerIds: string[];
}

interface DbMoviesResponse {
  movies: DbMovie[];
  pageInfo: PaginationInfo;
}

const movies = moviesData as DbMovie[];

export class MoviesApi {
  public async getMovie(id: string) {
    const movie = movies.find((movie) => movie.id === id);
    return Promise.resolve(movie);
  }

  public async getMovies({
    filterSpec,
    sortSpec,
    pageSpec,
  }: MoviesRequest): Promise<DbMoviesResponse> {
    // make a shallow copy of movies so that we don't accidentally mutate the original array
    let moviesResult = movies.slice();

    // ----- filter by search string -----
    const searchString = filterSpec?.search ?? '';
    if (searchString !== '') {
      moviesResult = moviesResult.filter((movie) =>
        movie.name.toLowerCase().includes(searchString.toLowerCase()),
      );
    }

    // ----- filter by featured -----
    const featured = filterSpec?.featured ?? false;
    if (featured) {
      moviesResult = moviesResult.filter((movie) => movie.isFeatured);
    }

    // ----- filter by certifications -----
    const certFilters = filterSpec?.certs ?? [];
    if (certFilters.length > 0) {
      moviesResult = moviesResult.filter((movie) =>
        certFilters.includes(movie.certificate.rating),
      );
    }

    // ----- filter by genres -----
    const genreFilters = filterSpec?.genres ?? [];
    if (genreFilters.length > 0) {
      moviesResult = moviesResult.filter((movie) =>
        // does at least one genre from movies.genres match genreFilters
        movie.genres.some((genre) => genreFilters.includes(genre)),
      );
    }

    // ----- sort -----
    if (sortSpec !== null && sortSpec !== undefined) {
      switch (sortSpec) {
        case MovieSortSpec.RankAsc:
          moviesResult = moviesResult.sort(
            (movie1, movie2) => movie1.rank - movie2.rank,
          );
          break;
        case MovieSortSpec.RankDesc:
          moviesResult = moviesResult.sort(
            (movie1, movie2) => movie2.rank - movie1.rank,
          );
          break;
        case MovieSortSpec.ReleaseYearAsc:
          moviesResult = moviesResult.sort(
            (movie1, movie2) => movie1.releaseYear - movie2.releaseYear,
          );
          break;
        case MovieSortSpec.ReleaseYearDesc:
          moviesResult = moviesResult.sort(
            (movie1, movie2) => movie2.releaseYear - movie1.releaseYear,
          );
          break;
      }
    }

    // ----- paginate -----
    const page = pageSpec?.page ?? 1;
    const perPage = pageSpec?.perPage ?? Math.max(1, moviesResult.length);

    // compute totalItems before slicing the array
    const totalItems = moviesResult.length;
    const totalPages = Math.ceil(totalItems / perPage);

    /*
     * example: page=2, perPage=10
     * result: start=10, end=20
     */
    const start = (page - 1) * perPage;
    const end = start + perPage;

    moviesResult = moviesResult.slice(start, end);

    const pageInfo: PaginationInfo = {
      totalPages,
      totalItems,
      page,
      perPage,
      hasNextPage: totalPages > page,
      hasPreviousPage: page > 1,
    };

    const response: DbMoviesResponse = {
      movies: moviesResult,
      pageInfo,
    };

    return Promise.resolve(response);
  }

  public async setFeaturedMovie(movieId: string, isFeatured: boolean) {
    const movie = movies.find((movie) => movie.id === movieId);
    if (movie) {
      movie.isFeatured = isFeatured;
    }
    return Promise.resolve(movie);
  }
}
