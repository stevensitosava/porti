'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { siteConfig } from '@/config/site';
import { useAppContext } from '@/context/app-context';
import { registerTimeline } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import NavLink from '@/components/ui/nav-link';
import TransitionLink from '@/components/ui/transition-link';
import Logo from '@/assets/svg/logo.svg';

/**
 * Navigation links for the header
 */
const links = [
  { href: '/', label: 'Home', props: { className: 'hidden md:inline-flex' } },
  { href: '/#about', label: 'About' },
  { href: '/projects', label: 'Work' },
];

/**
 * Header component that renders the navigation bar with logo, links, and contact button.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
export default function Header() {
  const { setModalOpen } = useAppContext();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap
        .timeline()
        .fromTo(ref.current, { y: '-100%', opacity: 0 }, { y: 0, opacity: 1 });

      registerTimeline('layout/header', tl);
    },
    { scope: ref },
  );

  return (
    <header
      id="header"
      className={cn(
        'absolute inset-x-0 top-0 z-10',
        'flex items-center',
        'w-screen',
        'py-8',
        'text-xs font-medium text-primary-100 uppercase tracking-widest',
      )}
      ref={ref}
    >
      <nav
        className={cn(
          'container px-8 xl:px-20 mx-auto',
          'flex-1 flex items-center md:justify-between gap-4',
        )}
      >
        <div className="md:w-36 mr-auto md:mr-0">
          <TransitionLink href="/">
            <Logo className="h-6 w-6" />
            <span
              className={cn(
                'sr-only',
                'text-base font-black leading-none tracking-tighter text-white',
              )}
            >
              {siteConfig.name}
            </span>
          </TransitionLink>
        </div>
        <ol className={cn('flex items-center gap-4 md:gap-8')}>
          {links.map((link) => (
            <li key={link.label} {...link.props}>
              <NavLink
                href={link.href}
                renderContent={({ isActive }) => (
                  <span className={cn(isActive && 'text-primary-400')}>{link.label}</span>
                )}
              />
            </li>
          ))}
        </ol>
        <div className={cn('flex justify-end', 'md:w-36')}>
          <NavLink
            className="flex gap-2 items-center cursor-pointer"
            renderContent={({ isActive }) => (
              <span
                className={cn(
                  'flex items-center gap-1',
                  'uppercase',
                  isActive && 'text-primary-400',
                )}
              >
                Contact <ArrowUpRight className="w-4 h-4" />
              </span>
            )}
            onClick={() => setModalOpen('contact')}
          />
        </div>
      </nav>
    </header>
  );
}
