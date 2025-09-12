import { cn } from '@/lib/utils';

/**
 * @typedef {object} FullWidthProps
 * @property {React.ReactNode} children - The content to be rendered in full width.
 * @property {string} [className] - Additional CSS classes to apply to the component.
 *
 * @description
 * The `FullWidth` component allows you to create content that spans the full viewport width (100vw), breaking out of the container constraints.
 *
 * @example
 * Here's a complete example of how to use the FullWidth component in your MDX content:
 * ```mdx
 * ## Regular Content
 *
 * This content is constrained within the container.
 *
 * <FullWidth>
 *   <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-12 text-center">
 *     <h2 className="text-3xl font-bold">Full Width Section</h2>
 *     <p className="mt-4 text-xl">This content spans the entire viewport width!</p>
 *   </div>
 * </FullWidth>
 *
 * ## Back to Regular Content
 *
 * This content is again constrained within the container.
 * ```
 * The component automatically handles the positioning to ensure it spans the full viewport width regardless of where it's used in your content.
 */
interface FullWidthProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content to be rendered in full width. */
  children: React.ReactNode;
}

const FullWidth = ({ children, className, ...props }: FullWidthProps) => {
  return (
    <div
      className={cn(
        'w-screen max-w-none',
        'relative left-1/2 right-1/2',
        'my-8 lg:my-20 -ml-[50vw] -mr-[50vw] last:mb-0',
        className,
      )}
      data-no-animation
      {...props}
    >
      {children}
    </div>
  );
};

export default FullWidth;
