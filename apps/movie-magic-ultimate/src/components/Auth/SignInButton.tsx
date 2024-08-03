import type { IconProps } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';
import type { ComponentType } from 'react';

export interface SignInButtonProps
  extends React.ComponentPropsWithRef<typeof Button> {
  providerId: string;
  providerName: string;
  ProviderIcon: ComponentType<IconProps>;
  redirectTo?: string | undefined;
}

export function SignInButton({
  providerId,
  providerName,
  ProviderIcon,
  redirectTo,
  ...props
}: SignInButtonProps) {
  const handleSignIn = async () => {
    'use server';
    await signIn(providerId, { redirectTo });
  };

  return (
    <form action={handleSignIn} className="w-full">
      <Button className="w-full" type="submit" variant="outline" {...props}>
        <ProviderIcon className="mr-2 size-4" />
        Continue with {providerName}
      </Button>
    </form>
  );
}
