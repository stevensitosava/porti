'use client';

import { useGSAP } from '@gsap/react';
import { ArrowDownLeft, ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { useAppContext } from '@/context/app-context';
import { toChildrenScrollIn } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import NavLinkUnderline from '@/components/ui/nav-link-underline';

interface IntroProps {
  withFilter?: boolean;
}

const Intro = ({ withFilter }: IntroProps) => {
  const { setModalOpen, projectFilter } = useAppContext();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      toChildrenScrollIn(ref.current?.querySelector('[data-intro]'), '[data-intro-item]');
    },
    { scope: ref },
  );

  return (
    <section className={cn('py-8 xl:py-20')} ref={ref}>
      <div className={cn('section-container', 'lg:grid grid-cols-4 gap-4 space-y-2')} data-intro>
        <div>
          <NavLinkUnderline
            className="inline-block"
            href="/"
            activeProps={{ className: 'text-gray-800' }}
            data-intro-item
          >
            <ArrowDownLeft className="w-4 h-4" />
            Back
          </NavLinkUnderline>
        </div>

        <div className={cn('col-span-2', 'max-w-xs lg:max-w-sm', 'space-y-2')}>
          <h2 className={cn('section-subtitle')} data-intro-item>
            Explore the history of my professional and personal projects
          </h2>
          {withFilter && (
            <NavLinkUnderline
              className="inline-block"
              activeProps={{ className: 'text-gray-800' }}
              data-intro-item
              onClick={() => setModalOpen('project-filter')}
            >
              {projectFilter.tag ? projectFilter.tag : 'All projects'}
              <ChevronDown className="w-4 h-4" />
            </NavLinkUnderline>
          )}
        </div>
      </div>
    </section>
  );
};

export default Intro;
