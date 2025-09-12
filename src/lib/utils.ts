import { ClassNameValue, twMerge } from 'tailwind-merge';

/**
 * Combines multiple Tailwind CSS class names into a single string,
 * resolving conflicts and ensuring proper merging.
 *
 * @param inputs - An array of ClassNameValue (string, array of strings, or object) to be merged.
 * @returns A single string containing the merged Tailwind CSS classes.
 */
export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}
