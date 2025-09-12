import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Slash } from 'lucide-react';
import { Fragment, useRef } from 'react';
import { cn } from '@/lib/utils';
import ScrollFill from '@/components/ui/scroll-fill';
import ScrollingText from '@/components/ui/scrolling-text';

/**
 * Array of skill sets organized by category
 */
const skillSets: string[][] = [
  // Frontend
  [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Three.js',
    'GSAP',
    'CSS',
    'HTML',
    'Tailwind CSS',
    'Figma',
  ],
  // Backend & APIs
  [
    'Node.js',
    'Python',
    'Flask',
    'Django',
    'GraphQL',
    'REST APIs',
  ],
  // Data & Machine Learning
  [
    'Pandas',
    'NumPy',
    'Scikit-learn',
    'PostgreSQL',
    'MongoDB',
  ],
  // Tools & Infrastructure
  [
    'Docker',
    'Git',
    'N8N',
    'CI/CD',
  ],
];

const AboutSkills = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const $skillSetWrapper = gsap.utils.toArray<HTMLDivElement>('[data-skill-set-wrapper]');
      $skillSetWrapper.forEach(($wrapper, i) => {
        const $el = $wrapper.firstElementChild as HTMLDivElement;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: $wrapper,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });

        if (i === 0) tl.fromTo('[data-title]', { y: '10vh', opacity: 0 }, { y: 0, opacity: 1 });
        tl.fromTo(
          $el,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.6, ease: 'power2.out' },
          '<0.1',
        );
      });
    },
    { scope: ref },
  );

  return (
    <div className={cn('space-y-8', className)} ref={ref} {...props}>
      <div className={cn('section-container', 'lg:flex justify-between space-y-2')} data-title>
        <h3 className="text-xl font-medium text-gray-800">Tools</h3>
        <p className="section-desc text-gray-500">
           Delivering clean code, scalable solutions, and seamless user experiences with a creative edge.
        </p>
      </div>

      <div className={cn('space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10')}>
        {skillSets.map((skills, i) => (
          <div className="overflow-hidden" key={i} data-skill-set-wrapper>
            <ScrollingText
              items={skills}
              className={cn('items-center gap-2 sm:gap-5')}
              direction={i % 2 === 0 ? 'left' : 'right'}
              renderItem={({ item }) => (
                <Fragment>
                  <ScrollFill
                    renderContent={({ isActive }) => (
                      <span
                        className={cn(
                          'text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.75] tracking-tight text-nowrap',
                          isActive ? 'text-gray-800' : 'text-gray-200',
                        )}
                      >
                        {item}
                      </span>
                    )}
                  />
                  <Slash
                    className={cn('shrink-0', 'w-8 lg:w-14 h-8 lg:h-14', 'text-gray-200')}
                    strokeWidth={0.5}
                  />
                </Fragment>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSkills;
