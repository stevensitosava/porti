import { Linkedin, Github, Dribbble } from 'lucide-react';
import FooterSocialLink from './footer-social-link';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { registerTimeline } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

/**
 * Defines the structure for a social media link.
 */
const links = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/steven-savarin/',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Stevensavarin',
    icon: Github,
  },
  /*{
    label: 'Dribbble',
    href: '',
    icon: Dribbble,
  },*/
];

/**
 * Renders a collection of social media links for the footer.
 *
 * @returns {JSX.Element} The rendered social links component.
 */
const ContactSocialLinks = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        ref.current?.querySelectorAll('[data-contact-social-link]') ?? null,
        { x: '5vh', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05 },
      );

      registerTimeline('layout/contact/social-links', tl);
    },
    { scope: ref },
  );

  return (
    <div className={cn('flex gap-4', className)} {...props} ref={ref}>
      {links.map((link) => (
        <FooterSocialLink
          key={link.href}
          link={link}
          className="opacity-0"
          data-contact-social-link
        />
      ))}
    </div>
  );
};

export default ContactSocialLinks;
