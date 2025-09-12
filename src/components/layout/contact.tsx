'use client';

import gsap from 'gsap';
import { useRef } from 'react';
import { useAppContext } from '@/context/app-context';
import { getTimeline, SLIDE_VARS } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import Modal from '@/components/ui/modal';
import ContactForm from './contact-form';
import ContactSocialLinks from './contact-social-links';
import { SplitText } from 'gsap/all';

/**
 * Renders the main footer component of the website.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { modalOpen, setModalOpen } = useAppContext();

  const handleOpen = () => {
    const titleSplit = SplitText.create(ref.current?.querySelector('[data-title]') ?? null, {
      type: 'lines',
    });
    const from = { ...SLIDE_VARS, x: '5vh', opacity: 0 };
    const to = { ...SLIDE_VARS, x: 0, opacity: 1, stagger: 0.05 };

    const tl = gsap.timeline({
      delay: 0.6,
      onComplete: () => {
        titleSplit.revert();
      },
    });
    const socialTl = getTimeline('layout/contact/social-links');
    const contactTl = getTimeline('layout/contact/form');

    tl.fromTo(ref.current?.querySelector('[data-subtitle]') ?? null, from, to);
    tl.fromTo(titleSplit.lines, from, to, '<0.05');
    tl.fromTo(ref.current?.querySelector('[data-desc]') ?? null, from, to, '<0.05');
    if (socialTl) tl.add(socialTl.paused(false).seek(0), '<0.05');
    if (contactTl) tl.add(contactTl.paused(false).seek(0), '<0.05');
  };

  return (
    <Modal isOpen={modalOpen === 'contact'} onOpen={handleOpen} onClose={() => setModalOpen(null)}>
      <div
        className={cn(
          'section-container',
          'h-full',
          'grid lg:grid-cols-4 gap-8 lg:gap-4',
          'pt-8 xl:pt-20',
        )}
        ref={ref}
      >
        <h2 data-subtitle>Contact</h2>

        <div className={cn('col-span-3', 'grid lg:grid-cols-2 gap-8 lg:gap-4')}>
          <div className={cn('flex flex-col gap-8', 'lg:pb-20')}>
            <div className={cn('flex-1', 'flex flex-col justify-center', 'space-y-2 md:space-y-4')}>
              <div
                className={cn(
                  'text-5xl xl:text-6xl font-black text-gray-400 tracking-tight leading-none uppercase',
                  'max-w-sm',
                )}
                data-title
              >
                Let's make amazing ideas come true together!
              </div>
              <p className={cn('section-desc', 'max-w-sm')} data-desc>
                If you are looking for a partner for your next project or someone to boost your team, 
  I             am ready to contribute and create something extraordinary with you.
              </p>
            </div>

            <ContactSocialLinks />
          </div>

          <ContactForm className="lg:self-end" />
        </div>
      </div>
    </Modal>
  );
};

export default Contact;
