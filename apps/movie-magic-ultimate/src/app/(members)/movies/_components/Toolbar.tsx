'use client';

import { Icons } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toggle } from '@/components/ui/toggle';
import {
  CertificateRating,
  Genre,
  MovieSortSpec,
} from '@/generated/gql/graphql';
import {
  convertCertificateRating,
  convertGenre,
  convertMovieSortSpec,
} from '@/lib/converters';
import { useState } from 'react';

const genreValues = Object.values(Genre);
const ratingValues = Object.values(CertificateRating);
const sortValues = Object.values(MovieSortSpec);

function Search() {
  return <Input placeholder="Search" />;
}

function GenreFilter() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium">Genre</h2>
      <div className="flex flex-wrap gap-2">
        {genreValues.map((genre) => (
          <Toggle
            aria-label={convertGenre(genre)}
            className="w-20"
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
    </div>
  );
}

function RatingFilter() {
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  function toggleRating(rating: string) {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium">Rating</h2>
      <div className="flex flex-wrap gap-2">
        {ratingValues.map((rating) => (
          <Toggle
            aria-label={convertCertificateRating(rating)}
            className="w-20"
            key={rating}
            onPressedChange={() => {
              toggleRating(rating);
            }}
            pressed={selectedRatings.includes(rating)}
            size="sm"
            variant="outline"
          >
            {convertCertificateRating(rating)}
          </Toggle>
        ))}
      </div>
    </div>
  );
}

function SortSelector() {
  const [selectedSort, setSelectedSort] = useState<string>(sortValues[0]);

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium">Sort By</h2>
      <Select onValueChange={setSelectedSort} value={selectedSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a sort field" />
        </SelectTrigger>
        <SelectContent>
          {sortValues.map((sortValue) => (
            <SelectItem key={sortValue} value={sortValue}>
              {convertMovieSortSpec(sortValue)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
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
          <SheetContent className="w-full" side="left">
            <div className="flex items-center justify-between py-8">
              <h1 className="text-lg">Filter & Sort</h1>
              <Button size="sm" variant="secondary">
                Clear filters
              </Button>
            </div>
            <div className="space-y-8">
              <Search />
              <GenreFilter />
              <RatingFilter />
              <SortSelector />
            </div>
          </SheetContent>
          <Badge variant="secondary">250</Badge>
        </Sheet>
      </div>
    </div>
  );
}
