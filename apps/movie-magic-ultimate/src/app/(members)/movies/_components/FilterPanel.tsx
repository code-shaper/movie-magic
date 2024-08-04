'use client';

import {
  MoviesRequestContextProvider,
  useMoviesRequestContext,
} from './MoviesRequestContextProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import type { MoviesRequest } from '@/generated/gql/graphql';
import {
  CertificateRating,
  Genre,
  MovieSortSpec,
} from '@/generated/gql/graphql';
import { MoviesRequestHelper as mrh } from '@/lib/MoviesRequestHelper';
import {
  formatCertificateRating,
  formatGenre,
  formatMovieSortSpec,
} from '@/lib/converters';

const genreValues = Object.values(Genre);
const ratingValues = Object.values(CertificateRating);
const sortValues = Object.values(MovieSortSpec);

export interface HeaderProps {
  onApplyFilters: (moviesRequest: MoviesRequest) => void;
  onClearFilters: () => void;
}

function Header({ onApplyFilters, onClearFilters }: HeaderProps) {
  const { moviesRequest } = useMoviesRequestContext();

  return (
    <div className="flex items-center gap-2">
      <h1 className="flex-1 text-lg">Filter & Sort</h1>
      <Button onClick={onClearFilters} size="sm" variant="secondary">
        Clear
      </Button>
      <Button
        onClick={() => {
          onApplyFilters(moviesRequest);
        }}
        size="sm"
      >
        Apply
      </Button>
    </div>
  );
}

function Search() {
  const { moviesRequest, setMoviesRequest } = useMoviesRequestContext();
  const searchString = mrh.getSearchFilter(moviesRequest);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoviesRequest(mrh.setSearchFilter(moviesRequest, event.target.value));
  };

  return (
    <Input onChange={handleChange} placeholder="Search" value={searchString} />
  );
}

function GenreFilter() {
  const { moviesRequest, setMoviesRequest } = useMoviesRequestContext();
  const selectedGenres = mrh.getGenresFilter(moviesRequest);

  const toggleGenre = (genre: Genre) => {
    setMoviesRequest(mrh.toggleGenre(moviesRequest, genre));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium">Genre</h2>
      <div className="flex flex-wrap gap-2">
        {genreValues.map((genre) => (
          <Toggle
            aria-label={formatGenre(genre)}
            className="w-20"
            key={genre}
            onPressedChange={() => {
              toggleGenre(genre);
            }}
            pressed={selectedGenres.includes(genre)}
            size="sm"
            variant="outline"
          >
            {formatGenre(genre)}
          </Toggle>
        ))}
      </div>
    </div>
  );
}

function RatingFilter() {
  const { moviesRequest, setMoviesRequest } = useMoviesRequestContext();
  const selectedRatings = mrh.getRatingsFilter(moviesRequest);

  const toggleRating = (rating: CertificateRating) => {
    setMoviesRequest(mrh.toggleRating(moviesRequest, rating));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium">Rating</h2>
      <div className="flex flex-wrap gap-2">
        {ratingValues.map((rating) => (
          <Toggle
            aria-label={formatCertificateRating(rating)}
            className="w-20"
            key={rating}
            onPressedChange={() => {
              toggleRating(rating);
            }}
            pressed={selectedRatings.includes(rating)}
            size="sm"
            variant="outline"
          >
            {formatCertificateRating(rating)}
          </Toggle>
        ))}
      </div>
    </div>
  );
}

function SortSelector() {
  const { moviesRequest, setMoviesRequest } = useMoviesRequestContext();
  const selectedSort = mrh.getSortSpec(moviesRequest);

  const setSelectedSort = (sort: MovieSortSpec) => {
    setMoviesRequest(mrh.setSortSpec(moviesRequest, sort));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium">Sort By</h2>
      <Select onValueChange={setSelectedSort} value={selectedSort}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select a field" />
        </SelectTrigger>
        <SelectContent>
          {sortValues.map((sortValue) => (
            <SelectItem key={sortValue} value={sortValue}>
              {formatMovieSortSpec(sortValue)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export interface FilterPanelProps {
  moviesRequest: MoviesRequest;
  onApplyFilters: (moviesRequest: MoviesRequest) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  moviesRequest,
  onClearFilters,
  onApplyFilters,
}: FilterPanelProps) {
  return (
    <MoviesRequestContextProvider initialState={moviesRequest}>
      <div className="flex h-full flex-col gap-y-4 pt-6">
        <Header
          onApplyFilters={onApplyFilters}
          onClearFilters={onClearFilters}
        />
        <div className="flex flex-1 flex-col gap-y-8 overflow-auto px-1 py-4">
          <Search />
          <GenreFilter />
          <RatingFilter />
          <SortSelector />
        </div>
      </div>
    </MoviesRequestContextProvider>
  );
}
