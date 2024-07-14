import { AppHeader } from '@/components/AppHeader';
import { siteConfig } from '@/config/site';
import { AppProvider } from '@/providers';
import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { Inter, Roboto_Mono as RobotoMono } from 'next/font/google';

import './globals.css';

/*
 * Load the fonts using next/font/google. For details, see
 * https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const robotoMono = RobotoMono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Radix UI',
    'shadcn/ui',
    'Apollo GraphQL',
  ],
  authors: [
    {
      name: 'Naresh Bhatia',
      url: 'https://nareshbhatia.dev',
    },
  ],
  creator: 'Naresh Bhatia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1280,
        height: 698,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@NareshJBhatia',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  noStore();

  const baseApiUrl = process.env.BASE_API_URL ?? '';
  const useMockData = process.env.USE_MOCK_DATA === 'true';

  return (
    <html
      className={`${inter.variable} ${robotoMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body>
        <AppProvider baseApiUrl={baseApiUrl} useMockData={useMockData}>
          <div className="relative flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-1">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
