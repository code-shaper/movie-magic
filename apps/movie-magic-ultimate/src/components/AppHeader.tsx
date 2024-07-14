import { MainNav } from './MainNav';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <MainNav />
        </div>
      </div>
    </header>
  );
}
