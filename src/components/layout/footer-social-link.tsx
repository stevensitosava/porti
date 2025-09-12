import { cn } from '@/lib/utils';
import HoverSlideUp from '../ui/hover-slide-up';

/**
 * Interface for a social media link.
 */
interface FooterSocialLink {
  /** The accessible label for the link */
  label: string;
  /** The URL of the social media profile */
  href: string;
  /** The icon component for the social media link */
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

/**
 * Props for the FooterSocialLink component.
 */
interface FooterSocialLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** The social link data */
  link: FooterSocialLink;
}

/**
 * Renders a single social media link for the footer.
 *
 * @param {FooterSocialLinkProps} props - The component props.
 * @returns {JSX.Element} The rendered social link component.
 */
const FooterSocialLink = ({ link, className, ...props }: FooterSocialLinkProps) => {
  return (
    <a
      key={link.href}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className={cn(
        'border border-gray-700 rounded-full',
        'hover:bg-primary-400 hover:border-primary-400',
        'transition-colors',
        className,
      )}
      {...props}
    >
      <HoverSlideUp
        renderContent={({ isActive }) => (
          <span
            className={cn(
              'inline-flex',
              'p-4',
              isActive && 'text-white',
              !isActive && 'text-gray-500',
            )}
          >
            <link.icon className="w-4 lg:w-6 h-4 lg:h-6" />
          </span>
        )}
      />
    </a>
  );
};

export default FooterSocialLink;
