'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { registerTimeline } from '@/lib/gsap';
import { useAppContext } from '@/context/app-context';

/**
 * Represents a visual component that animates an opening page effect using GSAP.
 * It accepts standard SVG attributes as props.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - The SVG props to be applied to the component.
 * @returns {JSX.Element} The PageOpen component.
 */
const PageOpen = (props: React.SVGProps<SVGSVGElement>) => {
  const { setIsLoading } = useAppContext();
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap
        .timeline({
          delay: 0.3,
          onStart: () => {
            ref.current?.classList.remove('hidden');
          },
          onComplete: () => {
            ref.current?.classList.add('hidden');
          },
          onUpdate: () => {
            if (tl.progress() >= 0.5) setIsLoading(false);
          },
        })
        .to('path', {
          attr: { d: 'M0 0 Q90 30 180 0 V100 H0 Z' },
          duration: 0.6,
          ease: 'power3.in',
        })
        .to('path', {
          attr: { d: 'M0 100 Q90 100 180 100 V100 H0 Z' },
          duration: 0.9,
          ease: 'power3.out',
        });

      registerTimeline('ui/page-open', tl);
    },
    { scope: ref },
  );

  return (
    <svg
      width="180"
      height="100"
      viewBox="0 0 180 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path d="M0 0 Q90 0 180 0 V100 H0 Z" fill="white" />
    </svg>
  );
};

export default PageOpen;
