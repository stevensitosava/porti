import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { throttle } from 'lodash';
import { useId, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the ScrollFill component
 * @extends React.HTMLAttributes<HTMLSpanElement>
 */
export interface ScrollFillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Function that renders the content based on active state
   * @param {Object} param - The parameter object
   * @param {boolean} param.isActive - Whether the component is in active state
   * @returns {React.ReactNode} The content to render
   */
  renderContent: ({ isActive }: { isActive: boolean }) => React.ReactNode;
  /**
   * Additional class names to apply to the component
   */
  className?: string;
}

const wavePath =
  'M0,0 C0.25,-0.1 0.25,-0.1 0.5,0 C0.75,0.1 0.75,0.1 1,0 C1.25,-0.1 1.25,-0.1 1.5,0 C1.75,0.1 1.75,0.1 2,0 V1 H0 Z';
const squarePath = 'M0,0 H2 V1 H0 Z';

const ScrollFill = ({ className, renderContent, ...props }: ScrollFillProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const clipPathId = useId();

  useGSAP(
    () => {
      const state = { scrollProgress: 0 };
      const $svg = ref.current?.querySelector('svg');
      const $path = ref.current?.querySelector(`#${clipPathId} path`);

      if (!$path || !$svg) return;

      // Ensure the initial state of the clip path is at the bottom (unfilled)
      gsap.set($path, { y: 1 });

      // Create a timeline for the wave animation with ScrollTrigger
      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
        scrollTrigger: {
          trigger: ref.current,
          start: 'bottom bottom',
          end: 'center center',
          onUpdate: (self) => {
            if (self.isActive) {
              state.scrollProgress = self.progress;
              tl.play();
            } else {
              tl.pause();
              // Set progress to 1 when left the scroll area direction up, 0 when down
              state.scrollProgress = self.direction === 1 ? 1 : 0;
            }
            // Force update the path immediately
            updatePath();
          },
          onLeave: (self) => {
            // Ensure full fill when leaving the scroll area in the upward direction
            if (self.direction === 1) {
              state.scrollProgress = 1;
              updatePath();
            }
          },
        },
      });

      // Create function to update the path
      const updatePathBase = () => {
        // When scrollProgress is 1 (fully filled), use a rectangle path to ensure full coverage
        if (state.scrollProgress >= 1) {
          $path?.setAttribute('d', squarePath);
          gsap.set($path, { x: 0, y: 0 });
        } else {
          // Ensure wavePath is set when not fully filled
          if ($path?.getAttribute('d') !== wavePath) {
            $path?.setAttribute('d', wavePath);
          }
          // Instead of updating the path d attribute, we update CSS variables
          // This leverages GPU acceleration for better performance
          gsap.set($path, { y: 1 - state.scrollProgress });
        }
      };

      // Create a throttled version of updatePath that runs at most every 33ms (30fps)
      const updatePath = throttle(updatePathBase, 33);

      tl.fromTo($path, { x: 0 }, { x: -1, duration: 4, ease: 'none' });

      // Pause the timeline when not visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play();
          } else {
            tl.pause();
          }
        });
      });
      observer.observe(ref.current!);
    },
    { scope: ref },
  );

  return (
    <span className={cn('inline-flex', 'relative', className)} ref={ref} {...props}>
      {/* Hidden SVG for the animated clipPath with static paths */}
      <svg width="0" height="0" className={cn('absolute')}>
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            {/* Static wave path with transform-based animation */}
            <path d={wavePath} />
          </clipPath>
        </defs>
      </svg>

      {/* Static content (not filled) */}
      <span>{renderContent({ isActive: false })}</span>

      {/* Animated fill content, clipped by the wave */}
      <span
        aria-hidden
        data-nosnippet
        className={cn('absolute inset-0')}
        style={{ clipPath: `url(#${clipPathId})` }}
      >
        {renderContent({ isActive: true })}
      </span>
    </span>
  );
};

export default ScrollFill;
