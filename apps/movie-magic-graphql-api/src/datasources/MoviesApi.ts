import moviesData from './movies.json';
import type {
  Certificate,
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
  genres: string[];
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
    // hold result in moviesResult
    let moviesResult = movies;

    // ----- filter by certifications -----
    const certFilters = filterSpec?.certs;
    if (certFilters && certFilters.length > 0) {
      moviesResult = moviesResult.filter((movie) =>
        certFilters.includes(movie.certificate.rating)
      );
    }

    // ----- sort -----
    if (sortSpec) {
      switch (sortSpec) {
        case 'RANK_ASC':
          moviesResult = moviesResult.sort(
            (movie1, movie2) => movie1.rank - movie2.rank
          );
          break;
      }
    }

    // ----- paginate -----
    const page = pageSpec?.page !== undefined ? pageSpec.page : 1;
    const perPage =
      pageSpec?.perPage !== undefined
        ? pageSpec.perPage
        : Math.max(1, moviesResult.length);

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
