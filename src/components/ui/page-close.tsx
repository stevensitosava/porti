'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getTimeline, registerTimeline } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/app-context';

const startClipPath = 'M0 0 H1 V0 Q.5 0 0 0 V0 0';
const midClipPath = 'M0 0 H1 V0 Q.5 0.25 0 0 V0 0';
const endClipPath = 'M0 0 H1 V1 Q.5 1 0 1 V0 0';

/**
 * Represents a visual component that animates an opening page effect using GSAP.
 * It accepts standard SVG attributes as props.
 *
 * @param {React.SVGProps<SVGSVGElement>} props - The SVG props to be applied to the component.
 * @returns {JSX.Element} The PageClose component.
 */
const PageClose = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  const pathName = usePathname();
  const { setIsLoading } = useAppContext();
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap
        .timeline({
          paused: true,
          onStart: () => {
            setIsLoading(true);
            ref.current?.classList.remove('hidden');
          },
          onComplete: () => {
            getTimeline('layout/header')?.seek(0);
          },
        })
        .to('path', {
          attr: { d: midClipPath },
          duration: 0.6,
          ease: 'power3.in',
        })
        .to('path', {
          attr: { d: endClipPath },
          duration: 0.9,
          ease: 'power3.out',
        });

      registerTimeline('ui/page-close', tl);
    },
    { scope: ref },
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      const uiPageOpenTl = getTimeline('ui/page-open');
      uiPageOpenTl?.restart();
      ScrollTrigger.refresh();
      requestAnimationFrame(() => ref.current?.classList.add('hidden'));
    });
  }, [pathName]);

  return (
    <svg
      className={cn('hidden', className)}
      width="1"
      height="1"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path d={startClipPath} fill="white" />
    </svg>
  );
};

export default PageClose;
