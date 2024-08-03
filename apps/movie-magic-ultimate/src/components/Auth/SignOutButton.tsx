import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';

export interface SignOutButtonProps
  extends React.ComponentPropsWithRef<typeof Button> {
  redirectTo?: string | undefined;
}

export function SignOutButton({ redirectTo, ...props }: SignOutButtonProps) {
  const handleSignOut = async () => {
    'use server';
    await signOut({ redirectTo });
  };

  return (
    <form action={handleSignOut} className="w-full">
      <Button
        className="w-full"
        size="sm"
        type="submit"
        variant="secondary"
        {...props}
      >
        Sign Out
      </Button>
    </form>
  );
}
