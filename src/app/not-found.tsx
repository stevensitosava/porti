import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className={cn(
        'section-container',
        'max-w-xl min-h-screen',
        'flex flex-col justify-center items-center gap-4',
        'text-center',
      )}
    >
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-center text-gray-800">
        404
      </h1>
      <p>
        Found a dead end. Looks like you lost your way. The page you&apos;re looking for might have
        moved or doesn&apos;t exist.
      </p>
      <Link className="underline" href="/">
        Take me home
      </Link>
    </section>
  );
}
