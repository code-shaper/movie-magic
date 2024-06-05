import type { MoviesApi } from '@/datasources/MoviesApi';
import type { PeopleApi } from '@/datasources/PeopleApi';

// This interface is used with graphql-codegen to generate types for resolvers context
export interface DataSourceContext {
  dataSources: {
    moviesApi: MoviesApi;
    peopleApi: PeopleApi;
  };
}
