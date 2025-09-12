import React from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getTimeline } from '@/lib/gsap';

/**
 * A custom link component that transitions between pages with an animation.
 * Utilizes GSAP timelines for page transitions, specifically targeting a 'page-close' animation.
 *
 * @param {LinkProps} props - The properties for the Next.js Link component.
 * @returns {JSX.Element} A Next.js Link component with a transition effect.
 */

const TransitionLink = (props: LinkProps & React.HTMLAttributes<HTMLAnchorElement>) => {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Handles the transition between pages by playing the 'page-close' animation and
   * then navigating to the desired URL.
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e - The event that triggered the transition.
   */
  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (props.onClick) props.onClick(e);

    if (!props.href || pathname === props.href) return;

    e.preventDefault();
    const pageCloseTl = getTimeline('ui/page-close');

    pageCloseTl?.restart().then(() => router.push(props.href as string));
  };

  return <Link {...props} onClick={handleTransition} />;
};

export default TransitionLink;
