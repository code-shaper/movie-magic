import { AppFooter } from '@/components/AppFooter';
import { MinimalHeader } from '@/components/AppHeader';
import { SignInButton } from '@/components/Auth';
import { providers } from '@/config/providers';
import Link from 'next/link';

function Main() {
  return (
    <main className="flex h-full flex-col items-center justify-center py-6">
      <h1 className="text-center text-2xl font-bold tracking-tight">
        Create an account
      </h1>
      <div className="my-6 mb-8 mt-10 w-full space-y-4">
        {providers.map((provider) => (
          <SignInButton
            ProviderIcon={provider.icon}
            key={provider.id}
            providerId={provider.id}
            providerName={provider.name}
            redirectTo="/movies"
          />
        ))}
      </div>
      <Link className="text-sm leading-6" href="/sign-in" prefetch={false}>
        Already have an account? Sign In
      </Link>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <div className="flex h-screen flex-col px-6">
      <div className="container max-w-screen-lg">
        <MinimalHeader authMenu="SignInLink" />
      </div>
      <div className="container max-w-[320px] flex-1">
        <Main />
      </div>
      <div className="container mt-20 max-w-screen-lg">
        <AppFooter />
      </div>
    </div>
  );
}
