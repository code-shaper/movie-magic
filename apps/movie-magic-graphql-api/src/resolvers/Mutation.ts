// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import type { Resolvers } from '@/generated/resolvers-types';

export const Mutation: Resolvers = {
  Mutation: {
    setFeaturedMovie: async (
      _parent,
      { input: { movieId, isFeatured } },
      { dataSources }
    ) => {
      const movie = await dataSources.moviesApi.setFeaturedMovie(
        movieId,
        isFeatured
      );
      if (movie === undefined) {
        return {
          errors: [
            {
              __typename: 'NotFoundError',
              message: `Movie with id ${movieId} not found`,
            },
          ],
        };
      }

      return {
        recordId: movie.id,
        record: movie,
      };
    },
  },
};
