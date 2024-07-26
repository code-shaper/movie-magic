'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

function GenreFilter() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Genre</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {genreValues.map((genre) => (
          <DropdownMenuCheckboxItem
            checked={selectedGenres.includes(genre)}
            key={genre}
            onClick={() => {
              toggleGenre(genre);
            }}
          >
            {convertGenre(genre)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Rating</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ratingValues.map((rating) => (
          <DropdownMenuCheckboxItem
            checked={selectedRatings.includes(rating)}
            key={rating}
            onClick={() => {
              toggleRating(rating);
            }}
          >
            {convertCertificateRating(rating)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortSelect() {
  // use useState to store a MovieSortSpec value
  const [selectedSort, setSelectedSort] = useState<MovieSortSpec>(
    MovieSortSpec.RankAsc
  );

  return (
    <Select
      onValueChange={(value) => {
        setSelectedSort(value as MovieSortSpec);
      }}
      value={selectedSort}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder={selectedSort} />
      </SelectTrigger>
      <SelectContent side="top">
        {sortValues.map((sortValue) => (
          <SelectItem key={sortValue} value={sortValue}>
            {`Sort by ${convertMovieSortSpec(sortValue)}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function Toolbar() {
  return (
    <div className="sticky top-14 z-50 w-full bg-background">
      <div className="flex h-14 items-center gap-x-4 rounded-md">
        <Input className="w-16 flex-1 shrink-0" placeholder="Search" />
        <GenreFilter />
        <RatingFilter />
        <SortSelect />
      </div>
    </div>
  );
}
