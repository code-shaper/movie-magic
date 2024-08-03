import { Logo } from './Logo';
import { ModeToggle } from './ModeToggle';
import { SignInLink } from './SignInLink';
import { SignUpLink } from './SignUpLink';
import { UserMenu } from './UserMenu';

export interface MinimalHeaderProps {
  authMenu?: 'SignInLink' | 'SignUpLink' | 'UserMenu';
}

export function MinimalHeader({ authMenu = 'UserMenu' }: MinimalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="flex h-14 items-center justify-between">
        <Logo isNavigable />
        <nav className="flex flex-1 items-center justify-end gap-3">
          <ModeToggle />
          {authMenu === 'UserMenu' ? (
            <UserMenu />
          ) : authMenu === 'SignInLink' ? (
            <SignInLink />
          ) : (
            <SignUpLink />
          )}
        </nav>
      </div>
    </header>
  );
}
