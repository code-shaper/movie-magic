import { Icons } from '@/components/Icons';
import { graphql } from '@/generated/gql';
import { getClient } from '@/lib/apollo-client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {movie.image ? (
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <Image
              alt={movie.name}
              className="aspect-[2/3] w-full object-cover"
              height={movie.image.height}
              src={movie.image.url}
              width={movie.image.width}
            />
          </div>
        ) : (
          <Icons.image className="size-10 shrink-0" />
        )}

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{movie.name}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {movie.releaseYear}
          </div>

          <p className="text-lg leading-relaxed">{movie.description}</p>
        </div>
      </div>
    </main>
  );
}
