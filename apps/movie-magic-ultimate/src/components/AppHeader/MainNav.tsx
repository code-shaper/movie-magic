'use client';

import { Logo } from './Logo';
import { mainNavItems } from '@/config/main-nav';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden gap-4 min-[500px]:flex lg:gap-6">
      <Logo />
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {mainNavItems.map((item) => (
          <Link
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname.startsWith(item.href)
                ? 'text-foreground'
                : 'text-foreground/60',
            )}
            href={item.href}
            key={item.href}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
