import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { footerItems } from '@/config/footer';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className="flex items-center space-x-2 py-8">
      <Icons.film className="size-6" />
      <span className="text-xl font-medium dark:font-semibold">
        {siteConfig.name}
      </span>
      <nav className="flex flex-1 items-center justify-end gap-4">
        <Link
          className="text-sm font-semibold leading-6"
          href="/movies"
          prefetch={false}
        >
          Sign In <span aria-hidden="true">&rarr;</span>
        </Link>
      </nav>
    </header>
  );
}

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
          <p className="text-sm text-muted-foreground">New to Movie Magic?</p>
          <Button asChild size="lg">
            <Link href="/movies" prefetch={false}>
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex items-center justify-between py-3 lg:py-2">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Movie Magic
      </p>
      <nav className="flex gap-1">
        {footerItems.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            rel="noreferrer"
            target="_blank"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'h-8 w-8 px-0'
              )}
            >
              <item.icon className="size-4 text-muted-foreground" />
              <span className="sr-only">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </footer>
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
          <Header />
          <Content />
        </div>
        <HeroImage />
        <div className="mx-auto max-w-2xl px-6">
          <Footer />
        </div>
      </div>

      {/* Horizontal Layout @ lg */}
      <div className="hidden lg:grid lg:grid-cols-2">
        <div className="mx-auto flex h-screen max-h-[1024px] max-w-4xl flex-col px-12">
          <Header />
          <Content />
          <Footer />
        </div>
        <HeroImage />
      </div>
    </>
  );
}
