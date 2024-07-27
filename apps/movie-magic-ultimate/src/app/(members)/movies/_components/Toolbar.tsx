'use client';

import { Icons } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toggle } from '@/components/ui/toggle';
import { Genre } from '@/generated/gql/graphql';
import { convertGenre } from '@/lib/converters';
import { useState } from 'react';

const genreValues = Object.values(Genre);

function GenreFilter() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  return (
    <>
      <h2 className="mb-4 text-sm font-medium">Genre</h2>
      <div className="flex flex-wrap gap-2">
        {genreValues.map((genre) => (
          <Toggle
            aria-label={convertGenre(genre)}
            key={genre}
            onPressedChange={() => {
              toggleGenre(genre);
            }}
            pressed={selectedGenres.includes(genre)}
            size="sm"
            variant="outline"
          >
            {convertGenre(genre)}
          </Toggle>
        ))}
      </div>
    </>
  );
}

export function Toolbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-14 z-50 w-full bg-background">
      <div className="flex h-14 items-center justify-between">
        <Sheet onOpenChange={setOpen} open={open}>
          <SheetTrigger asChild>
            <Button variant="outline">
              Filter & Sort <Icons.listFilter className="ml-2 size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="pr-0" side="left">
            <h1 className="py-8 text-center text-lg">Filter & Sort</h1>
            <GenreFilter />
          </SheetContent>
          <Badge variant="secondary">250</Badge>
        </Sheet>
      </div>
    </div>
  );
}
