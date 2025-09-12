import { useCallback, useEffect, RefObject } from 'react';

/**
 * @interface UseFocusTrapOptions
 * @description Options for the useFocusTrap hook.
 * @property {RefObject<HTMLElement>} containerRef - A ref to the container element within which focus should be trapped.
 * @property {boolean} isActive - Controls whether the focus trap is active.
 * @property {RefObject<HTMLElement>} [initialFocusRef] - Optional ref to an element that should receive initial focus when the trap becomes active.
 * @property {() => void} [onEscape] - Optional callback function to be called when the Escape key is pressed.
 */
interface UseFocusTrapOptions {
  containerRef: RefObject<HTMLElement>;
  isActive: boolean;
  initialFocusRef?: RefObject<HTMLElement>;
  onEscape?: () => void;
}

/**
 * @function useFocusTrap
 * @description A custom hook to trap focus within a specified DOM element and handle Escape key presses.
 * @param {UseFocusTrapOptions} options - The options for the focus trap.
 */
export const useFocusTrap = ({
  containerRef,
  isActive,
  initialFocusRef,
  onEscape,
}: UseFocusTrapOptions) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!containerRef.current || !isActive) return;

      if (event.key === 'Escape') {
        onEscape?.();
      }

      if (event.key === 'Tab') {
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    },
    [containerRef, isActive, onEscape],
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);

      // Set initial focus
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleKeyDown, containerRef, initialFocusRef]);
};
