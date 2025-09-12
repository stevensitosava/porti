import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { registerTimeline, SLIDE_VARS } from '@/lib/gsap';

/**
 * Props for the MultilineSlideUp component.
 * @interface MultilineSlideUpProps
 * @extends React.HTMLAttributes<HTMLSpanElement>
 */
interface MultilineSlideUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The content to be animated. */
  children: React.ReactNode;
  /** Optional name for the GSAP timeline, allowing it to be registered and controlled externally. */
  timelineName?: string;
}

/**
 * A React component that animates its children by splitting them into lines and sliding them up using GSAP.
 * It uses `SplitText` to break the text into individual lines and then animates each line from `yPercent: 100` to `yPercent: 0`.
 *
 * @component
 * @param {MultilineSlideUpProps} The props for the component.
 * @returns {JSX.Element} A span element containing the animated children.
 */
const MultilineSlideUp = ({ children, timelineName }: MultilineSlideUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const split = SplitText.create(ref.current, { type: 'lines', mask: 'lines' });
    const tl = gsap.timeline();

    tl.fromTo(split.lines, { yPercent: 100 }, { ...SLIDE_VARS, yPercent: 0, stagger: 0.1 });
    if (timelineName) registerTimeline(timelineName, tl);
  });

  return <span ref={ref}>{children}</span>;
};

export default MultilineSlideUp;
