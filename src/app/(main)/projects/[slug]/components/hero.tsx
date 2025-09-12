'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import HeroBg from '@/components/ui/hero-bg';
import HeroScroll from '@/components/ui/hero-scroll';
import { getTimeline, registerTimeline, toScrollGrayscale } from '@/lib/gsap';
import { type Project } from '@/lib/projects';
import { cn } from '@/lib/utils';
import MultilineSlideUp from '@/components/ui/multiline-slide-up';

/**
 * Props for the Hero component.
 * @interface HeroProps
 */
interface HeroProps {
  /** The project data. */
  project: Project;
}

/**
 * Hero component that displays an introduction section.
 * @returns {JSX.Element} The Hero section.
 */
const Hero = ({ project }: HeroProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const $desc = ref.current?.querySelector('[data-desc]') ?? null;
      const $scroll = ref.current?.querySelector('[data-scroll]') ?? null;

      const tl = gsap.timeline({ delay: 0.1 });
      const titleTl = getTimeline('projects/hero/title');

      if (titleTl) tl.add(titleTl, '<0.1');
      tl.fromTo($desc, { y: '100%', opacity: 0 }, { y: 0, opacity: 1 }, '<0.1');
      tl.fromTo($scroll, { y: '100%', opacity: 0 }, { y: 0, opacity: 1 }, '<0.1');

      registerTimeline('projects/hero', tl);
      toScrollGrayscale(ref.current);
    },
    { scope: ref },
  );

  return (
    <section
      className={cn(
        'flex flex-col justify-center min-h-screen leading-',
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
        <div
          className={cn(
            'max-w-4xl',
            'text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-center',
          )}
          data-title
        >
          <h1 className="text-white">
            <MultilineSlideUp timelineName="projects/hero/title">
              {project.data.title}
            </MultilineSlideUp>
          </h1>
        </div>

        {project.data.type && (
          <p className="text-sm sm:text-base text-secondary-300" data-desc>
            {project.data.type}
          </p>
        )}

        <HeroScroll className="text-sm sm:text-base text-secondary-300" data-scroll>
          View Detail
        </HeroScroll>
      </div>
    </section>
  );
};

export default Hero;
