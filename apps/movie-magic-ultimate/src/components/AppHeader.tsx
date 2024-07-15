import { MainNav } from './MainNav';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import Link from 'next/link';

/**
 * <header> has `border-border/40` – this specifies its color, but it's width is
 * not specified. Hence border is not actually drawn.
 */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center px-8">
        <MainNav />
        <nav className="flex flex-1 items-center justify-end gap-4">
          <ModeToggle />
          <Button asChild size="sm">
            <Link href="/signin" prefetch={false}>
              Sign In
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
