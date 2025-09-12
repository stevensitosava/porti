import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/app/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '900'],
  variable: '--font-outfit',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('font-sans antialiased', outfit.variable)}>{children}</body>
    </html>
  );
}
