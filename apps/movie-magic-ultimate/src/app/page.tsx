import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Home page has a responsive layout, with a breakpoint at 1024px (lg).
 * 1. Below this breakpoint:
 *    - The text is at the top and the image is at the bottom
 *    - The text is centered
 * 2. Above this breakpoint:
 *    - The text is on the left and the image is on the right
 *    - The Text is left-aligned.
 */
export default function HomePage() {
  return (
    <div className="container relative mx-auto max-w-screen-lg py-4">
      <div className="grid text-center lg:grid-cols-2 lg:text-left">
        <div className="flex flex-col items-center space-y-6 p-8 lg:items-start lg:justify-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl/none xl:text-6xl/none">
              <span className="block">Unlimited movies</span>
              <span className="block text-primary">anytime, anywhere</span>
            </h1>
            <p className="max-w-sm text-muted-foreground lg:max-w-md lg:text-xl">
              Watch a world of blockbusters, classics, and exclusive originals
              with our premium service.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">New to Movie Magic?</p>
            <Button asChild size="lg">
              <Link href="/movies" prefetch={false}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
        <Image
          alt="Couple watching a movie in a home theater"
          className="mx-auto aspect-square overflow-hidden object-cover sm:w-full lg:order-last"
          height="1024"
          src="/hero.jpg"
          width="1024"
        />
      </div>
    </div>
  );
}
