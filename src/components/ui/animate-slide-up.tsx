'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { registerTimeline, SLIDE_VARS } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Props for the AnimateSlideUp component
 */
interface AnimateSlideUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * An array of strings to display and animate.
   */
  items: string[];
  /**
   * Optional props to apply to each individual item span.
   */
  itemProps?: React.HTMLAttributes<HTMLSpanElement>;
  /**
   * The GSAP timeline name to register the animation under.
   */
  timelineName?: string;
}

/**
 * A component that creates a slide-up effect on hover
 * @param {AnimateSlideUpProps} props - The component props
 * @returns {React.ReactElement} The rendered component
 */
const AnimateSlideUp = ({
  className,
  items = [],
  itemProps: { className: itemClassName, ...itemProps } = {},
  timelineName,
  ...props
}: AnimateSlideUpProps): React.ReactElement => {
  const ref = useRef<HTMLSpanElement>(null);
  const longestItem = items.reduce((max, item) => (item.length > max.length ? item : max), '');

  const { contextSafe } = useGSAP(
    () => {
      /** Stores the initial animation timeline. */
      const initialTl = gsap.timeline({ paused: !!timelineName });
      /** Stores the current loop timeline and its associated ScrollTrigger instance. */
      let currentLoop: { tl: gsap.core.Timeline; st: ScrollTrigger } | null = null;
      const itemsElements = gsap.utils.toArray<HTMLSpanElement>('[data-item]');

      // Create loop timeline immediately if needed, but keep it paused initially
      if (items.length > 1) {
        currentLoop = animateItemsLoop(itemsElements);
        currentLoop.tl.pause(); // Pause it until the initial animation completes
      }

      // Initial animation for the first item
      initialTl.fromTo(
        itemsElements[0],
        { y: '100%' },
        {
          ...SLIDE_VARS,
          y: 0,
          onComplete: () => {
            currentLoop?.tl.play(); // Start the loop when initial animation finishes
          },
        },
      );

      // Register the initial timeline if a name is provided
      if (timelineName) registerTimeline(timelineName, initialTl);

      return () => {
        currentLoop?.st?.kill(); // Kill ScrollTrigger first
        currentLoop?.tl?.kill(); // Then kill the timeline
        initialTl.kill(); // Also kill the initial timeline
      };
    },
    { scope: ref, dependencies: [items] },
  );

  /**
   * Animates the sliding up of items in a loop.
   * @param {HTMLSpanElement[]} itemsElements - An array of HTML span elements to animate.
   * @returns {{ tl: gsap.core.Timeline; st: ScrollTrigger }} An object containing the GSAP timeline and its ScrollTrigger instance.
   */
  const animateItemsLoop = contextSafe((itemsElements: HTMLSpanElement[]) => {
    const tl = gsap.timeline({
      repeat: -1,
      delay: 2,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause resume pause',
      },
    });

    for (const [i, item] of itemsElements.entries()) {
      const nextItem = itemsElements[(i + 1) % itemsElements.length];

      tl.fromTo(item, { y: 0 }, { immediateRender: false, ...SLIDE_VARS, y: '-100%' }, '+=3');
      tl.fromTo(nextItem, { y: '100%' }, { ...SLIDE_VARS, y: 0 }, '<');
    }

    return { tl, st: tl.scrollTrigger! };
  });

  return (
    <span
      className={cn('inline-flex', 'relative', 'overflow-hidden', className)}
      ref={ref}
      {...props}
    >
      <span aria-hidden data-nosnippet className="opacity-0">
        {longestItem}
      </span>
      {items.map((item, i) => (
        <span className={cn('absolute inset-0', itemClassName)} data-item key={i} {...itemProps}>
          {item}
        </span>
      ))}
    </span>
  );
};

export default AnimateSlideUp;
