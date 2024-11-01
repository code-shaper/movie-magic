import { MoviesApi } from './datasources/MoviesApi';
import { PeopleApi } from './datasources/PeopleApi';
import { resolvers } from './resolvers';
import type { DataSourceContext } from './types/DataSourceContext';
import type { GraphQLRequestContext } from '@apollo/server';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';

const port = process.env.PORT ?? '4000';

const loggerPlugin = {
  async requestDidStart(
    requestContext: GraphQLRequestContext<DataSourceContext>,
  ) {
    console.log('Request:', requestContext.request.operationName);
    await Promise.resolve();
  },
};

async function main() {
  const typeDefs = gql(
    readFileSync('./src/gql/schema.graphql', {
      encoding: 'utf-8',
    }),
  );

  const server = new ApolloServer<DataSourceContext>({
    typeDefs,
    resolvers,
    plugins: [loggerPlugin],
  });

  /*
   * Passing an ApolloServer instance to the `startStandaloneServer` function:
   *  1. creates an Express app
   *  2. installs your ApolloServer instance as middleware
   *  3. prepares your app to handle incoming requests
   */
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number.parseInt(port) },
    // eslint-disable-next-line @typescript-eslint/require-await
    context: async () => ({
      dataSources: {
        moviesApi: new MoviesApi(),
        peopleApi: new PeopleApi(),
      },
    }),
  });

  console.log(`🚀  Server ready at: ${url}`);
}

void main();
