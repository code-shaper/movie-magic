import { Icons } from '@/components/Icons';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export interface LogoProps {
  isNavigable?: boolean;
}

export function Logo({ isNavigable = false }: LogoProps) {
  return isNavigable ? (
    <Link className="flex items-center gap-x-2" href="/">
      <Icons.film className="size-6" />
      <span className="font-semibold dark:font-bold">{siteConfig.name}</span>
    </Link>
  ) : (
    <div className="flex items-center gap-x-2">
      <Icons.film className="size-6" />
      <span className="font-semibold dark:font-bold">{siteConfig.name}</span>
    </div>
  );
}
