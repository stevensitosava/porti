'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { getTimeline } from '@/lib/gsap';
import { type Project, type ProjectTagData } from '@/lib/projects';
import { useEffect } from 'react';
import useProjectsData from '@/hooks/use-projects-data';
import { useAppContext } from '@/context/app-context';
import Hero from './hero';
import Intro from './intro';
import Projects from './projects';
import Filter from './filter';

/**
 * @interface ViewProps
 * @description Props for the View component.
 */
interface ViewProps {
  /** An array of project data. */
  projects: Project[];
  /** An array of unique tags associated with all projects, including their counts. */
  tags: ProjectTagData[];
  /** The number of projects to display per page. */
  perPage: number;
  /** The total number of projects available. */
  total: number;
}

/**
 * @function View
 * @description A React functional component that displays a list of projects with infinite scrolling.
 * @param {ViewProps} props - The props for the View component.
 * @returns {JSX.Element} The rendered View component.
 */
const View = ({ projects: initialProjects, tags, perPage, total }: ViewProps) => {
  const { isLoading, projectFilter } = useAppContext();
  const { projects, hasMore, loaderRef, totalProjects } = useProjectsData({
    initialProjects,
    perPage,
    total,
    tag: projectFilter.tag,
  });

  useGSAP(() => {
    const tl = gsap.timeline({ paused: isLoading });
    const layoutHeaderTl = getTimeline('layout/header');
    const homeHeroTl = getTimeline('projects/hero');

    if (layoutHeaderTl) tl.add(layoutHeaderTl);
    if (homeHeroTl) tl.add(homeHeroTl, '<0.1');
  }, [isLoading]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [projects]);

  return (
    <main className="h-feed">
      <Hero />
      <Intro withFilter={tags.length > 0} />
      <Projects projects={projects} total={totalProjects} />
      {hasMore && <div ref={loaderRef} />}
      {tags.length > 0 && <Filter tags={tags} />}
    </main>
  );
};

export default View;
