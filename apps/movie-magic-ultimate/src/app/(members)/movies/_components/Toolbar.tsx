'use client';

import { FilterPanel } from './FilterPanel';
import { Icons } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import type { MoviesRequest } from '@/generated/gql/graphql';
import { MoviesRequestHelper as mrh } from '@/lib/MoviesRequestHelper';
import { usePathname, useRouter } from 'next/navigation';

import { useState } from 'react';

/*
 * "fragment ToolbarInfo" generates:
 *   1. ToolbarInfoFragment
 *   2. ToolbarInfoFragmentDoc
 */
const ToolbarInfoFragment = graphql(/* GraphQL */ `
  fragment ToolbarInfo on PaginationInfo {
    totalItems
  }
`);

export interface ToolbarProps {
  moviesRequest: MoviesRequest;
  toolbarInfo: FragmentType<typeof ToolbarInfoFragment>;
}

export function Toolbar({
  moviesRequest,
  toolbarInfo: toolbarInfoProp,
}: ToolbarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const toolbarInfo = getFragmentData(ToolbarInfoFragment, toolbarInfoProp);

  const handleApplyFilters = (moviesRequest: MoviesRequest) => {
    setOpen(false);
    const searchParamsString = mrh.toSearchParamsString(moviesRequest);
    router.push(`${pathname}?${searchParamsString}`);
  };

  const handleClearFilters = () => {
    setOpen(false);
    const searchParamsString = mrh.toSearchParamsString(mrh.newMoviesRequest());
    router.push(`${pathname}?${searchParamsString}`);
  };

  return (
    <div className="sticky top-14 z-50 w-full bg-background">
      <div className="flex h-14 items-center justify-between">
        <Sheet onOpenChange={setOpen} open={open}>
          <SheetTrigger asChild>
            <Button variant="outline">
              Filter & Sort{' '}
              {mrh.hasFilters(moviesRequest) ? (
                <Icons.listFilterActive className="ml-2 size-4" />
              ) : (
                <Icons.listFilter className="ml-2 size-4" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full" side="left">
            <FilterPanel
              moviesRequest={moviesRequest}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </SheetContent>
          <Badge variant="secondary">{toolbarInfo.totalItems}</Badge>
        </Sheet>
      </div>
    </div>
  );
}
