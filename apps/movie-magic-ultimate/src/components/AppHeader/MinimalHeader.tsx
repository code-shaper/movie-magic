import { Logo } from './Logo';
import { ModeToggle } from './ModeToggle';

export function MinimalHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="flex h-14 items-center justify-between">
        <Logo isNavigable />
        <nav className="flex flex-1 items-center justify-end gap-3">
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
