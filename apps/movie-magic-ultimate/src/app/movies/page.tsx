import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { graphql } from '@/generated/gql';
import { getClient } from '@/lib/apollo-client';
import { convertCertificateRating } from '@/lib/converters';
import * as React from 'react';

/*
 * Disable server-side full route cache
 * See https://nextjs.org/docs/app/building-your-application/caching#opting-out-2
 */
export const dynamic = 'force-dynamic';

/*
 * "query moviesPage" generates:
 *   1. MoviesPageQuery
 *   2. MoviesPageQueryVariables
 *   3. MoviesPageDocument
 */
const moviesPageDocument = graphql(/* GraphQL */ `
  query moviesPage($input: MoviesRequest!) {
    movies(input: $input) {
      movies {
        id
        name
        certificate {
          rating
        }
      }
    }
  }
`);

export default async function MoviesPage() {
  const { data } = await getClient().query({
    query: moviesPageDocument,
    variables: { input: {} },
  });
  const { movies: moviesResponse } = data;

  return (
    <div className="container relative mx-auto max-w-screen-xl px-8 py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-[80px]">Cert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moviesResponse.movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell className="font-medium">{movie.name}</TableCell>
              <TableCell>
                {convertCertificateRating(movie.certificate.rating)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
