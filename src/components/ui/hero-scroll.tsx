import { cn } from '@/lib/utils';
import { Mouse } from 'lucide-react';

/**
 * Props for the HeroScroll component.
 * @interface HeroScrollProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
interface HeroScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered inside the component.
   * @type {React.ReactNode}
   */
  children: React.ReactNode;
}

/**
 * A scroll indicator component for the hero section.
 * @param {HeroScrollProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const HeroScroll = ({ className, children, ...props }: HeroScrollProps) => {
  return (
    <div className={cn('absolute bottom-8', 'grid gap-2 place-items-center', className)} {...props}>
      {children}
      <Mouse />
    </div>
  );
};

export default HeroScroll;
