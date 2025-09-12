import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { padStart } from 'lodash';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { getTimeline, SCROLL_IN_FROM_VARS, SCROLL_IN_TO_VARS, toScrollGrayscale } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { type Project } from '@/lib/projects';
import NavLinkUnderline from '@/components/ui/nav-link-underline';
import PortfolioBg from '@/components/ui/portfolio-bg';
import MultilineSlideUp from '@/components/ui/multiline-slide-up';
import PortfolioProjectTags from './portfolio-project-tags';

/**
 * Props for the {@link PortfolioProject} component.
 * @interface PortfolioProjectProps
 * @augments React.HTMLAttributes<HTMLDivElement>
 */
interface PortfolioProjectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The project data to display. */
  project: Project;
  /** The project number. */
  number: number;
  /** The total number of projects. */
  total: number;
}

/**
 * Renders a single portfolio project component.
 *
 * @param {object} props - The properties for the component.
 * @param {Project} props.project - The project data to display.
 * @param {string} [props.timelineName] - The name of the GSAP timeline to register.
 * @returns {JSX.Element} The rendered portfolio project component.
 */
const PortfolioProject = ({ project, number, total }: PortfolioProjectProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Enter animation
  useGSAP(
    () => {
      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current?.querySelector('[data-project-title]'),
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      const numberTl = getTimeline(`home/portfolio-project/number-${project.slug}`);
      const totalTl = getTimeline(`home/portfolio-project/total-${project.slug}`);
      const titleTl = getTimeline(`home/portfolio-project/title-${project.slug}`);
      if (numberTl) tl.add(numberTl.paused(false));
      if (totalTl) tl.add(totalTl.paused(false), '<0.1');
      if (titleTl) tl.add(titleTl.paused(false), '<0.1');
      tl.fromTo('[data-project-type]', SCROLL_IN_FROM_VARS, SCROLL_IN_TO_VARS, '<0.1');

      // Image timeline
      const imageTl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current?.querySelector('[data-project-figure]'),
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        },
      });
      imageTl.fromTo(
        '[data-project-figure]',
        { scale: 0.75, y: '5vh' },
        { scale: 1, y: 0, duration: 2 },
      );
      imageTl.fromTo('[data-project-image]', { scale: 1.5 }, { scale: 1, duration: 2 }, '<');

      // Description timeline
      const descTl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current?.querySelector('[data-project-desc]'),
          start: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });
      descTl.fromTo('[data-project-desc]', SCROLL_IN_FROM_VARS, SCROLL_IN_TO_VARS);
      descTl.fromTo('[data-project-links]', SCROLL_IN_FROM_VARS, SCROLL_IN_TO_VARS, '<0.1');

      toScrollGrayscale(ref.current);

      // Image height change handling
      const $image = ref.current?.querySelector<HTMLImageElement>('[data-project-image]');
      const handleImageLoad = () => {
        // Refresh the scroll trigger to account for the updated position after the image height adjusts
        imageTl.scrollTrigger?.refresh();
      };
      $image?.addEventListener('load', handleImageLoad);

      return () => {
        $image?.removeEventListener('load', handleImageLoad);
      };
    },
    { scope: ref },
  );

  return (
    <article
      className={cn('relative overflow-hidden', 'py-8 lg:py-0', 'text-white', 'h-entry')}
      ref={ref}
    >
      <PortfolioBg
        className={cn('w-full h-full', 'absolute inset-x-0 top-0')}
        color={project.data.color}
      />

      {project.data.tags && project.data.tags?.length > 0 && (
        <PortfolioProjectTags tags={project.data.tags} />
      )}

      <div
        className={cn(
          'section-container',
          'relative',
          'flex flex-col justify-between',
          'lg:min-h-screen lg:pt-8 xl:pt-20',
          'space-y-8',
        )}
      >
        <div className={cn('lg:grid grid-cols-4', 'space-y-4 lg:gap-4')}>
          <div
            className={cn(
              'flex gap-2 lg:block',
              'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black',
            )}
          >
            <span className="p-name">
              <MultilineSlideUp timelineName={`home/portfolio-project/number-${project.slug}`}>
                {padStart(number.toString(), 2, '0')}
              </MultilineSlideUp>
            </span>
            <span className={cn('block', 'text-white/25')}>
              <MultilineSlideUp timelineName={`home/portfolio-project/total-${project.slug}`}>
                {padStart(total.toString(), 2, '0')}
              </MultilineSlideUp>
            </span>
          </div>

          <div className={cn('space-y-1', 'col-span-3', 'lg:grid grid-cols-subgrid')}>
            <h3 className={cn('col-span-2', 'section-title', 'text-inherit')} data-project-title>
              <MultilineSlideUp timelineName={`home/portfolio-project/title-${project.slug}`}>
                {project.data.title}
              </MultilineSlideUp>
            </h3>

            {project.data.type && (
              <div className={cn('section-desc', 'text-white/70 lg:text-end')} data-project-type>
                {project.data.type}
              </div>
            )}
          </div>
        </div>

        <div className={cn('grid lg:grid-cols-4 gap-8 lg:gap-4 xl:gap-6 items-end')}>
          <div className={cn('lg:col-span-2')}>
            {project.data.image && (
              <figure
                className={cn(
                  'lg:max-h-[60vh]',
                  'overflow-hidden',
                  'lg:shadow-2xl shadow-black/10',
                  'origin-bottom',
                )}
                style={{ backgroundColor: project.data.color }}
                data-project-figure
              >
                <Image
                  className={cn('w-full', 'object-cover object-top', 'u-photo')}
                  src={project.data.image.src}
                  alt={project.data.title}
                  width={672}
                  height={
                    project.data.image.width && project.data.image.height
                      ? Math.round((672 / project.data.image.width) * project.data.image.height)
                      : 0
                  }
                  sizes="(width < 64rem) 384px, 672px"
                  data-project-image
                />
              </figure>
            )}
          </div>

          <div className={cn('lg:-order-1', 'lg:mb-28 xl:mb-44', 'lg:text-end')} data-project-desc>
            {project.data.description && (
              <p
                className={cn(
                  'opacity-70',
                  'text-sm xl:text-base line-clamp-3 md:line-clamp-5 lg:line-clamp-6',
                  'p-summary',
                )}
              >
                {project.data.description}
              </p>
            )}
          </div>

          <div className={cn('lg:mb-28 xl:mb-44', 'text-white/70')} data-project-links>
            <NavLinkUnderline
              href={`/projects/${project.slug}`}
              activeProps={{ className: 'text-white' }}
              className="u-url"
            >
              View Detail
              <ArrowUpRight className="w-4 h-4" />
            </NavLinkUnderline>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PortfolioProject;
