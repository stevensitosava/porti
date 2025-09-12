import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Fragment, useRef, useState } from 'react';
import { registerTimeline } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * @interface ScrollingTextProps
 * @augments React.HTMLAttributes<HTMLDivElement>
 */
interface ScrollingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** An array of strings to be scrolled. */
  items: string[];
  /** A render prop function to render each item. */
  renderItem: ({ item }: { item: string }) => React.ReactNode;
  /** The direction of the scrolling animation. Can be 'left' or 'right'. Defaults to 'left'. */
  direction?: 'left' | 'right';
  /** The name of the GSAP timeline to register. */
  timelineName?: string;
}

/**
 * A React component that displays a continuously scrolling list of text items.
 * It duplicates items to ensure a seamless loop and uses GSAP for animation.
 *
 * @param {ScrollingTextProps} props - The properties for the ScrollingText component.
 * @returns {React.ReactElement} A div element containing the scrolling text items.
 */
const ScrollingText = ({
  items,
  className,
  renderItem,
  direction = 'left',
  timelineName,
  ...props
}: ScrollingTextProps) => {
  // Duplicate items to ensure continuous scrolling
  const [duplicatedItems, setDuplicatedItems] = useState([...items, ...items]);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useGSAP(
    () => {
      if (!ref.current) return;

      const $items = Array.from(ref.current.children);
      const gapWidth = parseFloat(getComputedStyle(ref.current).gap || '0');
      const totalWidth = $items
        .slice(0, $items.length / 2) // Divide by 2 because we duplicate
        .reduce((acc, item) => acc + item.clientWidth + gapWidth, 0);

      // Calculate how many times to duplicate to fill the container
      const minDuplication = Math.ceil(ref.current.clientWidth / totalWidth) - 1; // -1 because we already duplicate once

      if (minDuplication > 0) {
        setDuplicatedItems((prev) => {
          let newSets = [...prev];
          for (let i = 0; i < minDuplication; i++) {
            newSets = newSets.concat(prev);
          }
          return newSets;
        });
      }

      const fromX = direction === 'left' ? 0 : -totalWidth;
      const toX = direction === 'left' ? -totalWidth : 0;

      const tl = gsap
        .timeline({
          repeat: -1,
          onStart: () => {
            hasStarted.current = true;
          },
        })
        .fromTo(
          ref.current,
          { x: fromX },
          {
            x: toX,
            ease: 'none',
            duration: totalWidth / 50,
          },
        );
      if (timelineName) registerTimeline(timelineName, tl);

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
        } else if (hasStarted.current) {
          tl.pause();
        }
      });
      // Observe the parent element for intersection.
      // The `ref.current` element (the scrolling container) has a `scrollWidth` significantly larger than its
      // `boundingClientRect.width`. The `IntersectionObserver` calculates intersection based on the element's
      // `boundingClientRect`, not its `scrollWidth`. Observing the parent ensures intersection is determined against a
      // bounding box that accurately reflects the visible area for the scrolling content, preventing premature pausing
      // if the container's bounding box is still within view but its content has scrolled out.
      observer.observe(ref.current.parentElement as HTMLElement);

      return () => {
        if (ref.current) observer.unobserve(ref.current.parentElement as HTMLElement);
      };
    },
    { scope: ref },
  );

  return (
    <div className={cn('flex', className)} {...props} ref={ref}>
      {duplicatedItems.map((item, i) => (
        <Fragment key={i}>{renderItem({ item })}</Fragment>
      ))}
    </div>
  );
};

export default ScrollingText;
