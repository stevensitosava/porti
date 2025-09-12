import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Slash } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import ScrollingText from '@/components/ui/scrolling-text';

/**
 * @interface PortfolioProjectTagsProps
 */
interface PortfolioProjectTagsProps {
  /** An array of strings representing the tags for the portfolio project. */
  tags: string[];
}

/**
 * Renders a component that displays a scrolling list of project tags.
 *
 * @param {PortfolioProjectTagsProps} props - The properties for the component.
 * @returns {JSX.Element} A div element containing the scrolling tags.
 */
const PortfolioProjectTags = ({ tags }: PortfolioProjectTagsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('[data-project-tags]', {
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: ref },
  );

  return (
    <div
      className={cn('hidden md:block', 'absolute inset-x-0 -bottom-px', 'overflow-hidden')}
      ref={ref}
    >
      <ScrollingText
        items={tags}
        className={cn('items-center gap-2 md:gap-5', 'translate-y-full')}
        renderItem={({ item }) => (
          <>
            <span
              className={cn(
                'text-7xl md:text-8xl lg:text-9xl xl:text-[200px] font-black uppercase leading-[0.75] tracking-tight text-nowrap',
              )}
            >
              {item}
            </span>
            <Slash
              className={cn('shrink-0', 'w-8 lg:w-14 h-8 lg:h-14', 'text-white/25')}
              strokeWidth={0.5}
            />
          </>
        )}
        data-project-tags
      />
    </div>
  );
};

export default PortfolioProjectTags;
