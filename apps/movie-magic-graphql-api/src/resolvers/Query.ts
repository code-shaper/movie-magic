// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import type { Resolvers } from '@/generated/resolvers-types';

export const Query: Resolvers = {
  Query: {
    movie: async (_parent, { id }, { dataSources }) => {
      const movie = await dataSources.moviesApi.getMovie(id);
      if (movie === undefined) {
        throw new Error(`Movie with id ${id} not found`);
      }

      return movie;
    },

    movies: async (_parent, { input: moviesRequest }, { dataSources }) => {
      const moviesResponse = await dataSources.moviesApi.getMovies(
        moviesRequest
      );
      return moviesResponse;
    },
  },

  Movie: {
    directors: async (parent, _args, { dataSources }) => {
      const directors = await dataSources.peopleApi.getPeople(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        parent.directorIds
      );
      return directors;
    },

    writers: async (parent, _args, { dataSources }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const writers = await dataSources.peopleApi.getPeople(parent.writerIds);
      return writers;
    },
  },

  CastMember: {
    person: async (parent, _args, { dataSources }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const person = await dataSources.peopleApi.getPerson(parent.personId);
      return person;
    },
  },
};
