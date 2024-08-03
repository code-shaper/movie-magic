import { SignInLink } from './SignInLink';
import { SignOutButton } from '@/components/Auth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/auth';

export async function UserMenu() {
  const session = await auth();

  const username = session?.user?.name ?? '?';
  const userEmail = session?.user?.email ?? undefined;
  const userImage = session?.user?.image ?? undefined;

  // Extract user initials
  const userInitials = username
    .split(' ')
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative size-8 rounded-full" variant="ghost">
              <Avatar className="size-8">
                <AvatarImage alt={username} src={userImage} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{username}</p>
                {userEmail !== undefined ? (
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                ) : undefined}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton redirectTo="/" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <SignInLink />
      )}
    </>
  );
}
