'use client';

import { useGSAP } from '@gsap/react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { toChildrenScrollIn } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { type Project } from '@/lib/projects';
import NavLinkUnderline from '@/components/ui/nav-link-underline';
import MetaItem from './meta-item';

interface IntroProps {
  project: Project;
}

const Intro = ({ project }: IntroProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      toChildrenScrollIn(ref.current?.querySelector('[data-intro]'), '[data-intro-item]');
      toChildrenScrollIn(ref.current?.querySelector('[data-intro-meta]'), 'dl');
    },
    { scope: ref },
  );

  return (
    <section className={cn('py-8 xl:py-20')} ref={ref}>
      <div className={cn('section-container', 'lg:grid grid-cols-4 gap-4 space-y-8')} data-intro>
        <div className="flex justify-between">
          <NavLinkUnderline
            className="inline-block"
            href="/projects"
            activeProps={{ className: 'text-gray-800' }}
            data-intro-item
          >
            <ArrowDownLeft className="w-4 h-4" />
            Back
          </NavLinkUnderline>

          {project.data.url && (
            <NavLinkUnderline
              className="inline-block lg:hidden"
              href={project.data.url}
              activeProps={{ className: 'text-gray-800' }}
              data-intro-item
            >
              Visit site
              <ArrowUpRight className="w-4 h-4" />
            </NavLinkUnderline>
          )}
        </div>

        <div className={cn('col-span-2', 'space-y-8 xl:space-y-20')}>
          {project.data.description && (
            <p className={cn('section-title', 'leading-normal', 'p-summary')} data-intro-item>
              {project.data.description}
            </p>
          )}

          <div className={cn('grid grid-cols-3 gap-8')} data-intro-meta>
            <div className={cn('space-y-8')}>
              {project.data.type && <MetaItem label="Type" value={project.data.type} />}
              {project.data.role && <MetaItem label="Role" value={project.data.role} />}
            </div>
            <div className={cn('col-span-2', 'space-y-8')}>
              {project.data.services && (
                <MetaItem label="Service" value={project.data.services.join(' / ')} />
              )}
              {project.data.date && (
                <MetaItem label="Year" value={new Date(project.data.date).getFullYear()} />
              )}
            </div>
          </div>
        </div>

        <div className={cn('hidden', 'lg:block', 'text-end')}>
          {project.data.url && (
            <NavLinkUnderline
              className="inline-block u-url"
              href={project.data.url}
              activeProps={{ className: 'text-gray-800' }}
              data-intro-item
            >
              Visit site
              <ArrowUpRight className="w-4 h-4" />
            </NavLinkUnderline>
          )}
        </div>
      </div>
    </section>
  );
};

export default Intro;
