import { cn } from '@/lib/utils';

/**
 * Renders a styled input component.
 *
 * @param {object} props - The component props.
 * @returns {JSX.Element} The rendered input component.
 */
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
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

export default Input;
