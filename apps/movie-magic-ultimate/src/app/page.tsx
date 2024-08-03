import { AppFooter } from '@/components/AppFooter';
import { MinimalHeader } from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';

function Content() {
  return (
    <div className="pb-24 pt-6 sm:pb-32 lg:flex-1 lg:pb-0 lg:pt-28">
      <h1 className="animate-slide-up text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
        <span className="block">Unlimited movies</span>
        <span className="block text-primary">anytime, anywhere</span>
      </h1>
      <div className="animate-slide-up [animation-delay:1s] [animation-fill-mode:backwards]">
        <p className="mt-6 text-lg text-muted-foreground xl:text-xl">
          Watch a world of blockbusters, classics, and exclusive originals with
          our premium service.
        </p>
        <div className="mt-10 space-y-2">
          <p className="text-sm text-muted-foreground">
            New to {siteConfig.name}?
          </p>
          <Button asChild size="lg">
            <Link href="/sign-up" prefetch={false}>
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function HeroImage() {
  return (
    <Image
      alt="Couple watching a movie in a home theater"
      className="aspect-[3/2] w-full object-cover lg:h-screen lg:max-h-[1024px]"
      height="1024"
      src="/hero.jpg"
      width="1024"
    />
  );
}

/**
 * Home page has a responsive layout, with a breakpoint at 1024px (lg).
 * 1. Below this breakpoint, we have content on the top and image on the bottom.
 *      [Content]
 *      [ Image ]
 * 2. Above this breakpoint, we have a content on the left and image on the right.
 *    We are also fixing the image height to 640px so that it doesn't grow too tall
 *    on larger screens.
 *      [Content] [ Image ]
 */
export default function HomePage() {
  return (
    <>
      {/* Vertical Layout < lg */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-2xl px-6">
          <MinimalHeader />
          <Content />
        </div>
        <HeroImage />
        <div className="mx-auto max-w-2xl px-6">
          <AppFooter />
        </div>
      </div>

      {/* Horizontal Layout @ lg */}
      <div className="hidden lg:grid lg:grid-cols-2">
        <div className="mx-auto flex h-screen max-h-[1024px] max-w-4xl flex-col px-12">
          <MinimalHeader />
          <Content />
          <AppFooter />
        </div>
        <HeroImage />
      </div>
    </>
  );
}
