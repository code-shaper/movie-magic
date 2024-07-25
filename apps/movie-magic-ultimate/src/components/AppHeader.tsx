import { MainNav } from './MainNav';
import { MobileNav } from './MobileNav';
import { ModeToggle } from './ModeToggle';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container flex h-14 max-w-screen-lg items-center px-4 sm:px-8">
        <MainNav />
        <MobileNav />
        <nav className="flex flex-1 items-center justify-end gap-3">
          <ModeToggle />
          <Link href="/" prefetch={false}>
            <Avatar className="size-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </Link>
        </nav>
      </div>
    </header>
  );
}
