'use client';

import { Icons } from './Icons';
import { mainNavItems } from '@/config/main-nav';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden min-[500px]:flex">
      <Link className="mr-4 flex items-center space-x-2 lg:mr-6" href="/">
        <Icons.film className="size-6" />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
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
    </div>
  );
}
