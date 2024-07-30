import type {
  MoviesRequest,
  CertificateRating,
  Genre,
  MovieSortSpec,
} from '@/generated/gql/graphql';

function newMoviesRequest(): MoviesRequest {
  return {};
}

function getSearchFilter(moviesRequest: MoviesRequest) {
  return moviesRequest.filterSpec?.search ?? '';
}

function setSearchFilter(moviesRequest: MoviesRequest, search: string) {
  return {
    ...moviesRequest,
    filterSpec: {
      ...moviesRequest.filterSpec,
      search,
    },
  };
}

function getGenresFilter(moviesRequest: MoviesRequest) {
  return moviesRequest.filterSpec?.genres ?? [];
}

function toggleGenre(moviesRequest: MoviesRequest, genre: Genre) {
  const genres = getGenresFilter(moviesRequest);
  const newGenres = genres.includes(genre)
    ? genres.filter((g) => g !== genre)
    : [...genres, genre];

  return {
    ...moviesRequest,
    filterSpec: {
      ...moviesRequest.filterSpec,
      genres: newGenres,
    },
  };
}

function getRatingsFilter(moviesRequest: MoviesRequest) {
  return moviesRequest.filterSpec?.certs ?? [];
}

function toggleRating(moviesRequest: MoviesRequest, rating: CertificateRating) {
  const ratings = getRatingsFilter(moviesRequest);
  const newRatings = ratings.includes(rating)
    ? ratings.filter((r) => r !== rating)
    : [...ratings, rating];

  return {
    ...moviesRequest,
    filterSpec: {
      ...moviesRequest.filterSpec,
      certs: newRatings,
    },
  };
}

function getSortSpec(moviesRequest: MoviesRequest) {
  return moviesRequest.sortSpec ?? '';
}

function setSortSpec(moviesRequest: MoviesRequest, sort: MovieSortSpec) {
  return {
    ...moviesRequest,
    sortSpec: sort,
  };
}

function hasFilters(moviesRequest: MoviesRequest) {
  return (
    getSearchFilter(moviesRequest).length > 0 ||
    getGenresFilter(moviesRequest).length > 0 ||
    getRatingsFilter(moviesRequest).length > 0 ||
    getSortSpec(moviesRequest).length > 0
  );
}

function toSearchParamsString(moviesRequest: MoviesRequest) {
  const urlSearchParams = new URLSearchParams();

  const search = getSearchFilter(moviesRequest);
  const genres = getGenresFilter(moviesRequest);
  const ratings = getRatingsFilter(moviesRequest);
  const sortSpec = getSortSpec(moviesRequest);

  if (search.length > 0) {
    urlSearchParams.append('search', search);
  }

  genres.forEach((genre) => {
    urlSearchParams.append('genre', genre);
  });

  ratings.forEach((rating) => {
    urlSearchParams.append('rating', rating);
  });

  if (sortSpec.length > 0) {
    urlSearchParams.append('sort', sortSpec);
  }

  return urlSearchParams.toString();
}

export const MoviesRequestHelper = {
  newMoviesRequest,

  getSearchFilter,
  setSearchFilter,

  getGenresFilter,
  toggleGenre,

  getRatingsFilter,
  toggleRating,

  getSortSpec,
  setSortSpec,

  hasFilters,

  toSearchParamsString,
};
