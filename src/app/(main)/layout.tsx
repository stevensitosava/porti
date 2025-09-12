import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { AppContextProvider } from '@/context/app-context';
import Contact from '@/components/layout/contact';
import Customizer from '@/components/ui/customizer';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Lenis from '@/components/layout/lenis';
import PageClose from '@/components/ui/page-close';
import PageOpen from '@/components/ui/page-open';
import '@/app/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '900'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['portafolio', 'software development', 'Next.js', 'React', 'Tailwind', 'frontend', 'backend', 'python'],
  authors: [{ name: 'Steven Savarin', url: 'https://stevensawarin.com/' }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: 'https://stevensawarin.com/',
    siteName: siteConfig.name,
    images: [
      {
        url: 'https://stevensawarin.com/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'us_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@StevenSaWarin',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['https://stevensawarin.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://stevensawarin.com/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn('font-sans antialiased', outfit.variable)}>
        <AppContextProvider>
          <Lenis>
            <Header />
            {children}
            <Footer />
          </Lenis>
          <Contact />
          <PageOpen className={cn('fixed inset-0 z-10', 'w-screen h-screen')} />
          <PageClose className={cn('fixed inset-0 z-10', 'w-screen h-screen')} />
          <Customizer />
        </AppContextProvider>
      </body>
    </html>
  );
}

