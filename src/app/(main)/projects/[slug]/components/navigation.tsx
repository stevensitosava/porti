import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { toChildrenScrollIn } from '@/lib/gsap';
import { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';
import NavigationItem from './navigation-item';

interface NavigationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

const Navigation = ({ prevProject, nextProject }: NavigationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    toChildrenScrollIn(ref.current);
  });

  return (
    <nav
      className={cn('lg:absolute right-0 lg:translate-y-4', 'max-w-xs', 'space-y-4 lg:space-y-0')}
      ref={ref}
    >
      {prevProject && <NavigationItem mode="prev" project={prevProject} />}
      {nextProject && <NavigationItem mode="next" project={nextProject} />}
    </nav>
  );
};

export default Navigation;
