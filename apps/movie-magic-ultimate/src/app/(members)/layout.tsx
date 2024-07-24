import { AppHeader } from '@/components/AppHeader';

interface MemberLayoutProps {
  children: React.ReactNode;
}

export default function MemberLayout({ children }: MemberLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AppHeader />
      <main className="container relative mx-auto max-w-screen-lg flex-1 p-4 sm:px-8">
        {children}
      </main>
    </div>
  );
}
