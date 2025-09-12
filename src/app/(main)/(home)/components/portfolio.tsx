import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { toChildrenScrollIn } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { Project } from '@/lib/projects';
import NavLinkUnderline from '@/components/ui/nav-link-underline';
import PortfolioProject from './portfolio-project';

/**
 * Props for the {@link Portfolio} component.
 * @interface PortfolioProps
 */
interface PortfolioProps {
  /** An array of featured projects to display. */
  projects: Project[];
}

/**
 * Type definition for a navigation timeline function.
 * @typedef {function(number, number): gsap.core.Timeline} NavTimelineFn
 * @param {number} fromIndex - The starting index for the navigation.
 * @param {number} toIndex - The target index for the navigation.
 */
export type NavTimelineFn = (fromIndex: number, toIndex: number) => gsap.core.Timeline;

/**
 * Renders the Portfolio section, showcasing featured projects.
 *
 * @param {object} props - The properties for the component.
 * @returns {JSX.Element} The rendered Portfolio section.
 */
const Portfolio = ({ projects }: PortfolioProps) => {
  const ref = useRef<HTMLElement>(null);

  // Enter animation
  useGSAP(
    () => {
      toChildrenScrollIn(ref.current?.querySelector('[data-title]'), '[data-title-item]');
      toChildrenScrollIn(ref.current?.querySelector('[data-footer]'), '[data-footer-item]');
    },
    { scope: ref },
  );

  return (
    <section id="work" ref={ref}>
      <div className={cn('py-8 xl:py-20 border-t border-gray-200')}>
        <div className={cn('section-container', 'lg:grid grid-cols-4 gap-4 space-y-2')} data-title>
          <p className="section-desc" data-title-item>
            Portfolio
          </p>

          <div className={cn('col-span-2', 'max-w-xs lg:max-w-sm', 'space-y-2')}>
            <h2 className={cn('section-subtitle', 'p-name')} data-title-item>
              My Work
            </h2>
            <p className={cn('section-desc')} data-title-item>
              Crafting digital solutions with code.
            </p>
          </div>
        </div>
      </div>

      {projects.map((project, i) => (
        <PortfolioProject
          key={project.slug}
          project={project}
          number={i + 1}
          total={projects.length}
        />
      ))}

      <div
        className={cn('section-container', 'lg:grid grid-cols-4 gap-4 space-y-2', 'py-8 xl:py-20')}
        data-footer
      >
        <p className="section-desc" data-footer-item>
          Want to explore further?
        </p>

        <div className={cn('col-span-2', 'max-w-xs lg:max-w-sm', 'space-y-2')}>
          <h3 className={cn('section-subtitle')} data-footer-item>
            Dive into my archive to see more projects, big and small
          </h3>
          <NavLinkUnderline
            className="inline-block"
            href="/projects"
            activeProps={{ className: 'text-gray-800' }}
            data-footer-item
          >
            View all projects
            <ArrowUpRight className="w-4 h-4" />
          </NavLinkUnderline>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
