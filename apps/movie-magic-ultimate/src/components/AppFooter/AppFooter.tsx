import { buttonVariants } from '@/components/ui/button';
import { footerItems } from '@/config/footer';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function AppFooter() {
  return (
    <footer className="flex items-center justify-between py-3 lg:py-2">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {siteConfig.name}
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
