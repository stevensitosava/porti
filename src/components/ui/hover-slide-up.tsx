'use client';

import { cn } from '@/lib/utils';

/**
 * Props for the HoverSlideUp component
 */
interface HoverSlideUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Function that renders the content based on active state
   * @param {Object} param - The parameter object
   * @param {boolean} param.isActive - Whether the component is in active state
   * @returns {React.ReactNode} The content to render
   */
  renderContent: ({ isActive }: { isActive: boolean }) => React.ReactNode;
}

/**
 * A component that creates a slide-up effect on hover
 * @param {HoverSlideUpProps} props - The component props
 * @returns {React.ReactElement} The rendered component
 */
const HoverSlideUp = ({ className, renderContent }: HoverSlideUpProps): React.ReactElement => {
  return (
    <span className={cn('inline-flex overflow-hidden group', 'relative', className)}>
      <span className={cn('transition-transform duration-300', 'group-hover:-translate-y-full')}>
        {renderContent({ isActive: false })}
      </span>

      <span
        aria-hidden
        data-nosnippet
        className={cn(
          'absolute inset-0 translate-y-full',
          'transition-transform duration-300',
          'group-hover:translate-y-0',
        )}
      >
        {renderContent({ isActive: true })}
      </span>
    </span>
  );
};

export default HoverSlideUp;
