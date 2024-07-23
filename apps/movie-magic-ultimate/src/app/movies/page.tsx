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

  /*
   * Table styling
   * -------------
   * <Table>
   *   Set to `table-fixed` to prevent expanding beyond the container width
   *   to fit content
   * <TableHead> for Cert column
   *   Set to `w-[80px]` to fix its width to 80px
   * <TableCell> for Name column
   *   Set to `truncated` to truncate long text while allowing it to expand
   *   within the fixed-width table
   */
  return (
    <div className="container relative mx-auto max-w-screen-xl px-8 py-4">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-[80px] text-center">Cert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moviesResponse.movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell className="truncate font-medium">
                {movie.name}
              </TableCell>
              <TableCell className="text-center">
                {convertCertificateRating(movie.certificate.rating)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
