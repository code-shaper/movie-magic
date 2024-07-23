import { Icons } from '@/components/Icons';
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
import { convertCertificateRating, convertGenre } from '@/lib/converters';
import Image from 'next/image';
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
        genres
        image {
          url
          width
          height
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
    <div className="container relative mx-auto max-w-screen-xl p-4">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]" />
            <TableHead>Title</TableHead>
            <TableHead className="w-[80px] text-center">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moviesResponse.movies.map((movie) => (
            <TableRow
              className="border-none text-muted-foreground"
              key={movie.id}
            >
              <TableCell>
                {movie.image ? (
                  <div className="relative flex size-10 shrink-0 overflow-hidden">
                    <Image
                      alt={movie.name}
                      className="aspect-square size-full object-cover"
                      height={movie.image.height}
                      src={movie.image.url}
                      width={movie.image.width}
                    />
                  </div>
                ) : (
                  <Icons.image className="size-10" />
                )}
              </TableCell>
              <TableCell>
                <p className="truncate text-base leading-5 text-accent-foreground">
                  {movie.name}
                </p>
                <div className="flex items-center gap-x-1">
                  {movie.genres.map((genre, index) => (
                    <React.Fragment key={index}>
                      <p>{convertGenre(genre)}</p>
                      {index < movie.genres.length - 1 && (
                        <Icons.dot className="size-4" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
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
