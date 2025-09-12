import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import AboutExperience from './about-experience';
import AboutSkills from './about-skills';
import AboutStats from './about-stats';
import { toChildrenScrollIn } from '@/lib/gsap';

const About = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      toChildrenScrollIn(ref.current?.querySelector('[data-intro]'));
    },
    { scope: ref },
  );

  return (
    <section id="about" className={cn('divide-y divide-gray-100', 'overflow-hidden')} ref={ref}>
      <div className="py-8 xl:py-20">
        <div className="section-container">
          <div className={cn('max-w-xs space-y-2')} data-intro>
            <h2 className="section-desc text-gray-500">About Me</h2>
            <p className="text-xl font-medium text-gray-800">
              I create scalable and user-focused web applications, combining backend logic with front-end design to deliver meaningful digital solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="py-8 xl:py-20">
        <div className={cn('section-container', 'lg:grid grid-cols-4 gap-4')}>
          <div
            className={cn('col-start-2 col-span-4', 'grid lg:grid-cols-2', 'lg:items-end gap-8')}
          >
            <AboutStats />
            <AboutExperience />
          </div>
        </div>
      </div>
      <AboutSkills className="py-8 xl:py-20" />
    </section>
  );
};

export default About;
