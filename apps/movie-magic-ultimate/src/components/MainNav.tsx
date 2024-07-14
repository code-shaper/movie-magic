'use client';

import { mainNavItems } from '@/config/main-nav';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <Link className="flex items-center space-x-2" href="/">
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm md:flex">
        {mainNavItems.map((item) => (
          <Link
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname.startsWith(item.href)
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
            href={item.href}
            key={item.href}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </>
  );
}
