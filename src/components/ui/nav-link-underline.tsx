import { cn } from '@/lib/utils';
import NavLink, { type NavLinkProps } from './nav-link';

/**
 * @interface NavLinkUnderlineProps
 * @extends Omit<NavLinkProps, 'renderContent'>
 */
interface NavLinkUnderlineProps extends Omit<NavLinkProps, 'renderContent'> {
  /** Additional props for the active span. */
  activeProps?: React.HTMLAttributes<HTMLSpanElement>;
  /** The content to be rendered inside the link. */
  children: React.ReactNode;
}

/**
 * A navigation link component that displays an underline effect.
 * It extends the functionality of `NavLink` and adds a custom border-image style for the underline.
 *
 * @param {NavLinkUnderlineProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered navigation link with an underline.
 */
const NavLinkUnderline = ({
  activeProps: { className: activeClassName = '', ...activeProps } = {},
  children,
  ...props
}: NavLinkUnderlineProps) => {
  return (
    <NavLink
      renderContent={({ isActive }) => (
        <span
          className={cn(
            'flex items-center gap-1',
            'border-b border-current',
            'text-[0.6875rem] lg:text-xs uppercase tracking-wider',
            !isActive && 'border-transparent',
            isActive && activeClassName,
          )}
          {...(isActive ? activeProps : null)}
        >
          {children}
        </span>
      )}
      {...props}
    />
  );
};

export default NavLinkUnderline;
