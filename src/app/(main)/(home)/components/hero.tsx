'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { siteConfig } from '@/config/site';
import { getTimeline, registerTimeline, toScrollGrayscale } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import AnimateSlideUp from '@/components/ui/animate-slide-up';
import HeroBg from '@/components/ui/hero-bg';
import HeroScroll from '@/components/ui/hero-scroll';
import MultilineSlideUp from '@/components/ui/multiline-slide-up';

/**
 * The roles that the site owner identifies with.
 */
const roles = ['UI/UX Enthusiast', 'Frontend Dev','Backend Dev'];

/**
 * Hero component that displays an animated introduction section.
 * Uses GSAP for animations and displays the site owner's name, roles, and description.
 * @returns {JSX.Element} The Hero section with animated content
 */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);

  // Enter animation
  useGSAP(
    () => {
      const $intro = ref.current?.querySelector('[data-intro]') ?? null;
      const $desc = ref.current?.querySelector('[data-desc]') ?? null;
      const $scroll = ref.current?.querySelector('[data-scroll]') ?? null;

      const nameTl = getTimeline('home/hero/name');
      const rolesTl = getTimeline('home/hero/roles');

      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo($intro, { y: '100%', opacity: 0 }, { y: 0, opacity: 1 });
      if (nameTl) tl.add(nameTl.paused(false), '<0.1');
      if (rolesTl) tl.add(rolesTl.paused(false), '<0.1');
      tl.fromTo($desc, { y: '100%', opacity: 0 }, { y: 0, opacity: 1 }, '<0.1');
      tl.fromTo($scroll, { y: '100%', opacity: 0 }, { y: 0, opacity: 1 }, '<0.1');

      registerTimeline('home/hero', tl);
      toScrollGrayscale(ref.current);
    },
    { scope: ref },
  );

  return (
    <section
      className={cn(
        'h-card',
        'flex flex-col justify-center min-h-screen',
        'relative overflow-hidden',
        'text-primary-100',
      )}
      ref={ref}
    >
      <HeroBg className={cn('w-full h-full', 'absolute inset-0 -z-10')} />

      <div
        className={cn(
          'container px-8 xl:px-20 mx-auto',
          'flex flex-col items-center gap-2 md:gap-4',
        )}
      >
        <p className="text-sm sm:text-base" data-intro>
          Welcome! I&apos;m
        </p>

        <div
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-center"
          data-title
        >
          <h1 className={cn('p-name', 'text-white')}>
            <MultilineSlideUp timelineName="home/hero/name">{siteConfig.name}</MultilineSlideUp>
          </h1>
          <p className={cn('text-primary-400')}>
            <AnimateSlideUp
              className="text-center"
              items={roles}
              itemProps={{ className: 'p-job-title' }}
              timelineName="home/hero/roles"
            />
          </p>
        </div>

        <p className="text-sm sm:text-base" data-desc>
          {siteConfig.description}
        </p>

        <HeroScroll className="text-sm sm:text-base" data-scroll>
          Ready to connect and collaborate!
        </HeroScroll>
      </div>
    </section>
  );
};

export default Hero;
