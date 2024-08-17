'use client';

import { Logo } from './Logo';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mainNavItems } from '@/config/main-nav';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import * as React from 'react';

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      className={cn(className)}
      href={href}
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 min-[500px]:hidden"
          variant="ghost"
        >
          <Icons.menu className="size-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="pr-0" side="left">
        <Logo />
        <div className="my-4 flex flex-col space-y-3 pb-10 pl-6">
          {mainNavItems.map((item) => (
            <MobileLink
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname.startsWith(item.href)
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
              href={item.href}
              key={item.href}
              onOpenChange={setOpen}
            >
              {item.title}
            </MobileLink>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
