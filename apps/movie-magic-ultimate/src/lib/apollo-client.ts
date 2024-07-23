import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

/**
 * This export is only available in React Server Components.
 *
 * Ensures that you can always access the same instance of ApolloClient during RSC for
 * an ongoing request, while always returning a new instance for different requests.
 */
export const { getClient, query, PreloadQuery } = registerApolloClient(
  () =>
    new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: process.env.BASE_API_URL,
        /*
         * Disable server-side data cache
         * See https://nextjs.org/docs/app/building-your-application/caching#opting-out-1
         */
        fetchOptions: { cache: 'no-store' },
      }),
    })
);
