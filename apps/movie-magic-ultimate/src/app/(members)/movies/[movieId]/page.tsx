import { Icons } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { graphql } from '@/generated/gql';
import { getClient } from '@/lib/apollo-client';
import { formatCertificateRating, formatGenre } from '@/lib/converters';
import { formatDuration } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as React from 'react';

/*
 * Disable server-side full route cache
 * See https://nextjs.org/docs/app/building-your-application/caching#opting-out-2
 */
export const dynamic = 'force-dynamic';

/*
 * "query movieDetail" generates:
 *   1. MovieDetailQuery
 *   2. MovieDetailQueryVariables
 *   3. MovieDetailDocument
 */
const movieDetailPageDocument = graphql(/* GraphQL */ `
  query MovieDetail($id: ID!) {
    movie(id: $id) {
      id
      name
      description
      cast {
        person {
          id
          name
          image {
            url
            width
            height
          }
        }
        characters
      }
      certificate {
        rating
      }
      directors {
        id
        name
      }
      genres
      image {
        url
        width
        height
      }
      rank
      ratingsSummary {
        aggregateRating
        voteCount
      }
      releaseYear
      runtime
      tagline
      writers {
        id
        name
      }
    }
  }
`);

interface MovieDetailPageProps {
  params: {
    movieId: string;
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { data, error } = await getClient().query({
    query: movieDetailPageDocument,
    variables: { id: params.movieId },
  });

  if (error || !data.movie) {
    notFound();
  }

  const { movie } = data;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        href="/movies"
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        Back to Movies
      </Link>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          {movie.image ? (
            <Image
              alt={movie.name}
              className="aspect-[2/3] w-full rounded-lg object-cover"
              height={movie.image.height}
              src={movie.image.url}
              width={movie.image.width}
            />
          ) : (
            <Icons.image className="size-10 shrink-0" />
          )}
        </div>
        <div className="md:col-span-2">
          <h1 className="mb-2 text-4xl font-bold">{movie.name}</h1>
          <p className="mb-4 text-xl italic text-muted-foreground">
            {movie.tagline}
          </p>
          <Button className="mb-6" size="lg">
            <Icons.play className="mr-2 size-5" />
            Play Movie
          </Button>
          <p className="mb-4">{movie.description}</p>
          <div className="mb-4 flex flex-wrap gap-4">
            <Badge variant="secondary">
              {formatCertificateRating(movie.certificate.rating)}
            </Badge>
            <div className="flex items-center">
              <Icons.star className="mr-1 size-5 text-yellow-400" />
              <span>{movie.ratingsSummary.aggregateRating}/10</span>
            </div>
            <span>Rank: #{movie.rank}</span>
          </div>
          <div className="mb-4 flex items-center gap-x-1">
            {movie.genres.map((genre, index) => (
              <React.Fragment key={index}>
                <p>{formatGenre(genre)}</p>
                {index < movie.genres.length - 1 && (
                  <Icons.dot className="size-4" />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center">
              <Icons.calendar className="mr-2 size-5" />
              <span>{movie.releaseYear}</span>
            </div>
            <div className="flex items-center">
              <Icons.clock className="mr-2 size-5" />
              <span>{formatDuration(movie.runtime)}</span>
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-semibold">Cast</h2>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {movie.cast.map((member) => (
              <Card key={member.person.name}>
                <CardContent className="flex items-center p-4">
                  {member.person.image ? (
                    <Image
                      alt={member.person.name}
                      className="mr-4 rounded-full"
                      height={50}
                      src={member.person.image.url}
                      width={50}
                    />
                  ) : (
                    <Icons.image className="mr-4 size-10 shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold">{member.person.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.characters?.join(', ')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h2 className="mb-2 text-2xl font-semibold">Directors</h2>
              <ul>
                {movie.directors.map((director) => (
                  <li key={director.id}>{director.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-semibold">Writers</h2>
              <ul>
                {movie.writers.map((writer) => (
                  <li key={writer.id}>{writer.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
