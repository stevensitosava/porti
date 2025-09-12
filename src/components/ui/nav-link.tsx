'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import HoverSlideUp from './hover-slide-up';
import TransitionLink from './transition-link';

/**
 * Props for the NavLink component
 */
export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The URL or path for the link */
  href?: string;
  /** Additional CSS classes to apply */
  className?: string;
  /**
   * Function that renders the content based on active state
   * @param {Object} param - The parameter object
   * @param {boolean} param.isActive - Whether the component is in active state
   * @returns {React.ReactNode} The content to render
   */
  renderContent: ({ isActive }: { isActive: boolean; isStatic?: boolean }) => React.ReactNode;
}

/**
 * Props for the button variant of NavLink
 */
interface ButtonNavLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  renderContent: ({ isActive }: { isActive: boolean; isStatic?: boolean }) => React.ReactNode;
}

/**
 * NavLink component for handling navigation links with active state.
 *
 * @param {NavLinkProps} props - Component props
 * @param {object} [props...rest] - Additional props to spread onto the link element
 * @returns {JSX.Element} The rendered link element (Next.js Link or anchor tag)
 */
export default function NavLink({
  href,
  className = '',
  renderContent,
  ...props
}: NavLinkProps | ButtonNavLinkProps) {
  const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
  const pathname = usePathname();
  // Determine if link is active
  const isActive = pathname === href;
  const linkClassName = cn('transition-colors', className);

  const renderHoverSlideUp = () => <HoverSlideUp renderContent={renderContent} />;

  // For active links
  if (isActive) {
    return (
      <span className={linkClassName} {...props}>
        {renderContent({ isActive: true, isStatic: true })}
      </span>
    );
  }

  // For buttons
  if (!href) {
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button type="button" className={linkClassName} {...buttonProps}>
        {renderHoverSlideUp()}
      </button>
    );
  }

  // For anchor links within the same page
  if (href?.startsWith('#') || href?.startsWith(`${pathname}#`)) {
    return (
      <a href={href} className={linkClassName} {...anchorProps}>
        {renderHoverSlideUp()}
      </a>
    );
  }

  // For internal Next.js links
  if (href?.startsWith('/')) {
    return (
      <TransitionLink href={href} className={linkClassName} {...anchorProps}>
        {renderHoverSlideUp()}
      </TransitionLink>
    );
  }

  // For external links
  return (
    <a
      href={href}
      className={linkClassName}
      target="_blank"
      rel="noopener noreferrer"
      {...anchorProps}
    >
      {renderHoverSlideUp()}
    </a>
  );
}
