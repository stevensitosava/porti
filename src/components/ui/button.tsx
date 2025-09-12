'use client';

import { cn } from '@/lib/utils';

/**
 * @interface ButtonProps
 * @template T - The type of the HTML element this button will render as.
 */
interface ButtonProps<T extends React.ElementType = 'button'> {
  /** The content of the button. */
  children: React.ReactNode;
  /** The size of the button. */
  size?: 'default' | 'lg';
  /** The HTML element to render the button as. */
  as?: T;
}

/**
 * Button component with a circular reveal animation on hover.
 * It can render as a button or an anchor tag.
 *
 * @param {ButtonProps} props - The properties for the Button component.
 * @returns {React.FC<ButtonProps>} A React functional component.
 */
const Button = <T extends React.ElementType = 'button'>({
  className,
  children,
  size = 'default',
  as,
  ...props
}: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  const Comp = as ? as : 'button';

  return (
    <Comp
      className={cn(
        'text-xs md:text-sm font-medium text-white/50 hover:text-white uppercase tracking-widest',
        'bg-white/5 hover:bg-primary-500 backdrop-blur',
        'cursor-pointer active:scale-95',
        'transition-colors',
        size === 'default' && 'px-6 py-3',
        size === 'lg' && 'px-6 py-3 xl:px-8 xl:py-4 xl:text-sm',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export default Button;
