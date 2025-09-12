import { cn } from '@/lib/utils';

/**
 * Renders a styled textarea component.
 *
 * @param {object} props - The component props.
 * @returns {JSX.Element} The rendered textarea component.
 */
const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={cn(
        'border-0 border-b border-gray-800 focus:border-gray-500 py-4',
        'outline-none',
        'text-sm xl:text-base',
        'placeholder:text-gray-500',
        className,
      )}
      {...props}
    />
  );
};

export default Textarea;
