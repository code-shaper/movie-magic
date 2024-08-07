import {
  CertificateRating,
  Genre,
  MovieSortSpec,
} from '@/generated/gql/graphql';
import type { MoviesRequest } from '@/generated/gql/graphql';

// ----- CertificateRating -----

const certificateRatingToString: Record<CertificateRating, string> = {
  [CertificateRating.G]: 'G',
  [CertificateRating.Nr]: 'NR',
  [CertificateRating.Pg]: 'PG',
  [CertificateRating.Pg_13]: 'PG-13',
  [CertificateRating.R]: 'R',
};

const certificateRatingFromString: Record<string, CertificateRating> = {
  G: CertificateRating.G,
  NR: CertificateRating.Nr,
  PG: CertificateRating.Pg,
  PG_13: CertificateRating.Pg_13,
  R: CertificateRating.R,
};

export function formatCertificateRating(rating: CertificateRating) {
  return certificateRatingToString[rating];
}

export function parseCertificateRating(input: string | undefined) {
  return input !== undefined
    ? certificateRatingFromString[input.toUpperCase()]
    : undefined;
}

export function parseCertificateRatings(input: string[] | string | undefined) {
  const ratings: CertificateRating[] = [];

  if (input !== undefined) {
    const inputArray = Array.isArray(input) ? input : [input];
    for (const rating of inputArray) {
      const parsedRating = parseCertificateRating(rating);
      if (parsedRating !== undefined) {
        ratings.push(parsedRating);
      }
    }
  }

  return ratings;
}

// ----- Genre -----

const genreToString: Record<Genre, string> = {
  [Genre.Action]: 'Action',
  [Genre.Adventure]: 'Adventure',
  [Genre.Animation]: 'Animation',
  [Genre.Biography]: 'Biography',
  [Genre.Comedy]: 'Comedy',
  [Genre.Crime]: 'Crime',
  [Genre.Drama]: 'Drama',
  [Genre.Family]: 'Family',
  [Genre.Fantasy]: 'Fantasy',
  [Genre.History]: 'History',
  [Genre.Horror]: 'Horror',
  [Genre.Music]: 'Music',
  [Genre.Mystery]: 'Mystery',
  [Genre.Romance]: 'Romance',
  [Genre.SciFi]: 'Sci-Fi',
  [Genre.Sport]: 'Sport',
  [Genre.Thriller]: 'Thriller',
  [Genre.War]: 'War',
  [Genre.Western]: 'Western',
};

const genreFromString: Record<string, Genre> = {
  ACTION: Genre.Action,
  ADVENTURE: Genre.Adventure,
  ANIMATION: Genre.Animation,
  BIOGRAPHY: Genre.Biography,
  COMEDY: Genre.Comedy,
  CRIME: Genre.Crime,
  DRAMA: Genre.Drama,
  FAMILY: Genre.Family,
  FANTASY: Genre.Fantasy,
  HISTORY: Genre.History,
  HORROR: Genre.Horror,
  MUSIC: Genre.Music,
  MYSTERY: Genre.Mystery,
  ROMANCE: Genre.Romance,
  SCI_FI: Genre.SciFi,
  SPORT: Genre.Sport,
  THRILLER: Genre.Thriller,
  WAR: Genre.War,
  WESTERN: Genre.Western,
};

export function formatGenre(genre: Genre) {
  return genreToString[genre];
}

export function parseGenre(input: string | undefined) {
  return input !== undefined ? genreFromString[input.toUpperCase()] : undefined;
}

export function parseGenres(input: string[] | string | undefined) {
  const genres: Genre[] = [];

  if (input !== undefined) {
    const inputArray = Array.isArray(input) ? input : [input];
    for (const genre of inputArray) {
      const parsedGenre = parseGenre(genre);
      if (parsedGenre !== undefined) {
        genres.push(parsedGenre);
      }
    }
  }

  return genres;
}

// ----- MovieSortSpec -----

const movieSortSpecToString: Record<MovieSortSpec, string> = {
  [MovieSortSpec.RankAsc]: 'Rank ascending',
  [MovieSortSpec.RankDesc]: 'Rank descending',
  [MovieSortSpec.ReleaseYearAsc]: 'Release year ascending',
  [MovieSortSpec.ReleaseYearDesc]: 'Release year descending',
};

const movieSortSpecFromString: Record<string, MovieSortSpec> = {
  RANK_ASC: MovieSortSpec.RankAsc,
  RANK_DESC: MovieSortSpec.RankDesc,
  RELEASE_YEAR_ASC: MovieSortSpec.ReleaseYearAsc,
  RELEASE_YEAR_DESC: MovieSortSpec.ReleaseYearDesc,
};

export function formatMovieSortSpec(sortSpec: MovieSortSpec) {
  return movieSortSpecToString[sortSpec];
}

export function parseMovieSortSpec(input: string | undefined) {
  return input !== undefined
    ? movieSortSpecFromString[input.toUpperCase()]
    : undefined;
}

// ----- SearchParams -----

/**
 * An object containing the search parameters of the MoviesPage URL.
 * The Next.js router does this translation for us automatically.
 * However, we immediately convert this structure to a MoviesRequest
 * because it is much more type-safe.
 *
 * Example
 * -------
 * The search parameters in the URL
 *
 *   /movies?search=the&genre=SCI_FI&rating=PG_13&rating=R&sort=RELEASE_YEAR_DESC
 *
 * are converted to the following structure:
 *
 *   {
 *     search: 'the',
 *     genre: 'SCI_FI',
 *     rating: ['PG_13', 'R'],
 *     sort: 'RELEASE_YEAR_DESC'
 *   }
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
 */
export interface SearchParams {
  search?: string;
  genre?: string[] | string;
  rating?: string[] | string;
  sort?: string;
}

/**
 * Converts searchParams to a MoviesRequest which is much more type-safe and
 * can be directly sent to the GraphQL API.
 */
export function searchParamsToMovieRequest(searchParams: SearchParams) {
  const { search, genre, rating, sort } = searchParams;

  const moviesRequest: MoviesRequest = {
    filterSpec: {
      search,
      genres: parseGenres(genre),
      certs: parseCertificateRatings(rating),
    },
    sortSpec: parseMovieSortSpec(sort),
  };

  return moviesRequest;
}
