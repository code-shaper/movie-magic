import { SignInLink } from './SignInLink';
import { SignOutButton } from '@/components/Auth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/auth';

export async function UserMenu() {
  const session = await auth();

  const username = session?.user?.name ?? '?';
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
            <Avatar className="size-8">
              <AvatarImage src={userImage} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
