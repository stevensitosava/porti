'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getTimeline } from '@/lib/gsap';
import { type Project } from '@/lib/projects';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/app-context';
import ImgBox from '@/components/mdx/img-box';
import Hero from './hero';
import Intro from './intro';
import Content from './content';
import Navigation from './navigation';
import Gallery from './gallery';

interface ViewProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const View = ({ project, prevProject, nextProject }: ViewProps) => {
  const { isLoading } = useAppContext();

  useGSAP(() => {
    const tl = gsap.timeline({ paused: isLoading });
    const layoutHeaderTl = getTimeline('layout/header');
    const homeHeroTl = getTimeline('projects/hero');

    if (layoutHeaderTl) tl.add(layoutHeaderTl);
    if (homeHeroTl) tl.add(homeHeroTl, '<0.1');
  }, [isLoading]);

  return (
    <main>
      <article className="h-entry">
        <h2 className={cn('hidden', 'p-name')}>{project.data.title}</h2>
        {project.data.date && (
          <time
            className={cn('hidden', 'dt-published')}
            dateTime={new Date(project.data.date).toISOString()}
          >
            {new Date(project.data.date).toDateString()}
          </time>
        )}
        <Hero project={project} />
        <Intro project={project} />
        {project.data.image && (
          <ImgBox
            src={project.data.image.src}
            alt={project.data.title}
            color={project.data.color}
            imgProps={{
              width: 672,
              height:
                project.data.image.width && project.data.image.height
                  ? Math.round(672 / (project.data.image.width / project.data.image.height))
                  : 0,
              className: 'u-photo',
            }}
          />
        )}

        <div
          className={cn(
            'section-container',
            'lg:grid grid-cols-4 gap-4 space-y-12 lg:space-y-0',
            'py-8 lg:py-20',
          )}
        >
          <div className="col-start-2 col-span-2">
            {project.content && <Content project={project} />}
          </div>
          <div className="lg:flex justify-end items-end">
            <Navigation prevProject={prevProject} nextProject={nextProject} />
          </div>
        </div>

        {project.data.gallery && <Gallery project={project} className="mb-4" />}
      </article>
    </main>
  );
};

export default View;
