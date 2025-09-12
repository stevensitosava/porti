import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { siteConfig } from '@/config/site';
import { SLIDE_VARS } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Renders the site name in the footer.
 *
 * @returns {JSX.Element} The rendered footer name component.
 */
const FooterName = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        })
        .fromTo(
          '[data-name-2]',
          { opacity: 0, yPercent: 100 },
          { ...SLIDE_VARS, opacity: 1, yPercent: 40 },
        )
        .fromTo(
          '[data-name-1]',
          { opacity: 0, yPercent: 100 },
          { ...SLIDE_VARS, opacity: 1, yPercent: 20 },
          '<0.1',
        );
    },
    { scope: ref },
  );

  return (
    <div
      className={cn(
        'relative translate-y-[40%]',
        'text-8xl sm:text-9xl xl:text-[300px] font-black  uppercase leading-[0.75] tracking-tight text-nowrap',
      )}
      ref={ref}
    >
      <div className={cn('text-gray-900')} data-name-1>
        {siteConfig.name}
      </div>
      <div className={cn('absolute bottom-0', 'text-gray-800')} data-name-2>
        {siteConfig.name}
      </div>
    </div>
  );
};

export default FooterName;
