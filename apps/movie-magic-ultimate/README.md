# Movie Magic Ultimate

This workspace takes the Movie Magic app to the ultimate level by adding
features comparable to a realistic app. Here's the tech stack we used for this
version.

1. Framework: [React 18](https://react.dev/) + [Next.js](https://nextjs.org/)
2. Styling: [Tailwind CSS](https://tailwindcss.com/) +
   [shadcn/ui](https://ui.shadcn.com/)
3. API: GraphQL using the
   [Apollo GraphQL Client](https://www.apollographql.com/docs/react/)

## Next.js caching disabled

Next.js implements 4 caching mechanisms as described
[here](https://nextjs.org/docs/app/building-your-application/caching). For this
implementation, we have disabled all these caching mechanisms to ensure that
fresh data is fetched every time a page is rendered. This is how we do it:

1. **Request Memoization**: No need to disable because we are not using the
   Fetch API.
2. **Data Cache**: Disabled using the `no-store` option on the Apollo client -
   see [here](./src/lib/ApolloClient.js#L25).
3. **Full Route Cache**: Disabled using the `force-dynamic` option on the pages
   that should not be cached, e.g. the
   [MoviesPage](./src/app/movies/page.tsx#L39).
4. **Router Cache**: Disabled using the `staleTimes` configuration in
   [next.config.js](./next.config.js#L13).
