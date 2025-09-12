'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getTimeline } from '@/lib/gsap';
import Hero from './hero';
import About from './about';
import Portfolio from './portfolio';
import { type Project } from '@/lib/projects';
import { useAppContext } from '@/context/app-context';

interface ViewProps {
  /** An array of featured projects to display. */
  featuredProjects: Project[];
}

/**
 * The main view component for the home page.
 * It orchestrates animations using GSAP and renders the Hero, About, and Portfolio sections.
 *
 * @param {ViewProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered main view component.
 */
const View = ({ featuredProjects }: ViewProps) => {
  const { isLoading } = useAppContext();

  useGSAP(() => {
    const tl = gsap.timeline({ paused: isLoading });
    const layoutHeaderTl = getTimeline('layout/header');
    const homeHeroTl = getTimeline('home/hero');

    if (layoutHeaderTl) tl.add(layoutHeaderTl);
    if (homeHeroTl) tl.add(homeHeroTl, '<0.1');
  }, [isLoading]);

  return (
    <main>
      <Hero />
      <About />
      <Portfolio projects={featuredProjects} />
    </main>
  );
};

export default View;
