import {
  CertificateRating,
  Genre,
  MovieSortSpec,
} from '@/generated/gql/graphql';

const certificateRatingMap: Record<CertificateRating, string> = {
  [CertificateRating.G]: 'G',
  [CertificateRating.Nr]: 'NR',
  [CertificateRating.Pg]: 'PG',
  [CertificateRating.Pg_13]: 'PG-13',
  [CertificateRating.R]: 'R',
};

const genreMap: Record<Genre, string> = {
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

const movieSortSpecMap: Record<MovieSortSpec, string> = {
  [MovieSortSpec.RankAsc]: 'Rank',
  [MovieSortSpec.ReleaseYearDesc]: 'Year',
};

export const convertCertificateRating = (rating: CertificateRating) =>
  certificateRatingMap[rating];

export const convertGenre = (genre: Genre) => genreMap[genre];

export const convertMovieSortSpec = (sortSpec: MovieSortSpec) =>
  movieSortSpecMap[sortSpec];
