export function MovieListHeader() {
  return (
    <header className="sticky top-14 z-50 hidden w-full border-b bg-background sm:top-28 sm:block">
      <div className="flex items-center gap-x-3 px-2 py-3 text-sm leading-none text-muted-foreground">
        <div className="mr-2 hidden w-8 shrink-0 text-right sm:block">#</div>
        <div className="w-16 flex-1 shrink-0 ">Title</div>
        <div className="hidden w-12 shrink-0 text-center sm:block">Rating</div>
        <div className="hidden w-12 shrink-0 text-right sm:block">Year</div>
        <div className="hidden w-12 shrink-0 text-right sm:block">Runtime</div>
      </div>
    </header>
  );
}
