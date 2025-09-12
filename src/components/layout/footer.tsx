'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowUpRight, ArrowUpToLine } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { getTimeline, SCROLL_IN_FROM_VARS, SCROLL_IN_TO_VARS, toScrollIn } from '@/lib/gsap';
import { useAppContext } from '@/context/app-context';
import MultilineSlideUp from '@/components/ui/multiline-slide-up';
import NavLinkUnderline from '@/components/ui/nav-link-underline';
import FooterMenu from './footer-menu';
import FooterName from './footer-name';
import FooterSocialLinks from './footer-social-links';

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const { setModalOpen } = useAppContext();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current?.querySelector('[data-title]'),
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
      const titleTl = getTimeline('layout/footer/title');

      if (titleTl) tl.add(titleTl);
      tl.fromTo('[data-desc]', SCROLL_IN_FROM_VARS, SCROLL_IN_TO_VARS, '<0.1');

      toScrollIn(ref.current?.querySelector('[data-to-top]'));
      toScrollIn(ref.current?.querySelector('[data-contact]'));
    },
    { scope: ref },
  );

  return (
    <footer
      className={cn(
        'min-h-screen',
        'flex flex-col justify-between',
        'py-8 xl:py-20',
        'relative overflow-hidden',
        'space-y-4',
        'bg-gray-950 text-gray-500',
      )}
      ref={ref}
    >
      <div className={cn('section-container', 'flex flex-col lg:grid grid-cols-4 gap-16 lg:gap-4')}>
        <div className="flex lg:flex-col justify-between gap-8">
          <FooterMenu />
          <NavLinkUnderline
            className="inline-block"
            href="#header"
            activeProps={{ className: 'text-primary-400' }}
            data-to-top
          >
            To top
            <ArrowUpToLine className="w-4 h-4" />
          </NavLinkUnderline>
        </div>

        <div className={cn('col-span-3', 'grid lg:grid-cols-2 gap-16 lg:gap-4')}>
          <div className={cn('flex flex-col gap-6')}>
            <h2
              className={cn(
                'text-5xl lg:text-6xl font-black text-gray-400 tracking-tight leading-none uppercase',
                'max-w-sm',
              )}
              data-title
            >
              <MultilineSlideUp timelineName="layout/footer/title">
                Every Project Opens a New Door
              </MultilineSlideUp>
            </h2>
            <p className={cn('section-desc', 'max-w-sm', 'lg:mb-16')} data-desc>
              What you’ve seen is just the beginning—let’s write the rest together.
            </p>
            <p data-contact>
              <NavLinkUnderline
                activeProps={{ className: 'text-primary-400' }}
                onClick={() => setModalOpen('contact')}
              >
                Get in touch <ArrowUpRight className="w-4 h-4" />
              </NavLinkUnderline>
            </p>
          </div>

          <div className="lg:flex justify-end">
            <FooterSocialLinks />
          </div>
        </div>
      </div>

      <FooterName />
    </footer>
  );
};

export default Footer;
