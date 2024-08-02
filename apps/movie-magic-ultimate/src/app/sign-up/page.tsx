import { Footer } from '@/components/Footer';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { signIn } from '@/lib/auth';

function Header() {
  return (
    <header className="flex items-center py-6">
      <div className="flex items-center space-x-2">
        <Icons.film className="size-6" />
        <span className="text-xl font-medium dark:font-semibold">
          {siteConfig.name}
        </span>
      </div>
    </header>
  );
}

function Main() {
  return (
    <main className="flex h-full flex-col items-center justify-center py-6">
      <h1 className="text-center text-2xl font-bold tracking-tight">
        Create an account
      </h1>
      <div className="my-6 mb-8 mt-10 w-full space-y-4">
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/movies' });
          }}
          className="w-full"
        >
          <Button className="w-full" type="submit" variant="outline">
            <Icons.google className="mr-2 size-4" />
            Continue with Google
          </Button>
        </form>
        <form
          action={async () => {
            'use server';
            await signIn('github', { redirectTo: '/movies' });
          }}
          className="w-full"
        >
          <Button className="w-full" type="submit" variant="outline">
            <Icons.gitHub className="mr-2 size-4" />
            Continue with GitHub
          </Button>
        </form>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <div className="flex h-screen flex-col px-6">
      <div className="container max-w-screen-lg">
        <Header />
      </div>
      <div className="container max-w-[320px] flex-1">
        <Main />
      </div>
      <div className="container mt-20 max-w-screen-lg">
        <Footer />
      </div>
    </div>
  );
}
