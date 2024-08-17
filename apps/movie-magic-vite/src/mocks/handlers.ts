import { movies } from './movies';
import type { MoviePagination, PaginationInfo } from '@/models';
import { http, HttpResponse } from 'msw';

const API_URL = 'http://localhost:8080';

export const handlers = [
  http.get(`${API_URL}/movies`, ({ request }) => {
    // hold result in moviesResult
    let moviesResult = movies;

    // URL object for extracting search params
    const url = new URL(request.url);

    // ----- filter by certifications -----
    let certFilters = url.searchParams.getAll('cert');
    if (certFilters.length > 0) {
      // convert certFilters to upper case
      certFilters = certFilters.map((certFilter) => certFilter.toUpperCase());
      moviesResult = moviesResult.filter((movie) =>
        certFilters.includes(movie.certificate),
      );
    }

    // ----- sort -----
    const sort = url.searchParams.get('sort');
    if (sort !== null) {
      switch (sort) {
        case 'RANK_ASC':
          moviesResult = moviesResult.sort(
            (movie1, movie2) => movie1.rank - movie2.rank,
          );
          break;
      }
    }

    // ----- paginate -----
    let page = 1;
    let perPage = Math.max(1, moviesResult.length);

    const pageString = url.searchParams.get('page');
    const perPageString = url.searchParams.get('perPage');
    if (pageString !== null && perPageString !== null) {
      page = Math.max(1, parseInt(pageString, 10));
      perPage = Math.max(1, parseInt(perPageString, 10));
    }

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

    const moviePagination: MoviePagination = {
      movies: moviesResult,
      pageInfo,
    };

    return HttpResponse.json(moviePagination);
  }),
];
