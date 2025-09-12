import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { toChildrenScrollIn } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/app-context';
import NavLink from '../ui/nav-link';

const FooterMenu = () => {
  const { setModalOpen } = useAppContext();
  const ref = useRef<HTMLUListElement>(null);

  /**
   * Navigation links for the footer
   */
  const links = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/projects', label: 'Work' },
    { label: 'Contact', props: { onClick: () => setModalOpen('contact') } },
  ];

  useGSAP(
    () => {
      toChildrenScrollIn(ref.current);
    },
    { scope: ref },
  );

  return (
    <ul className={cn('space-y-2', 'text-xl font-black tracking-tight leading-none')} ref={ref}>
      {links.map((link) => (
        <li key={link.label}>
          <NavLink
            href={link.href}
            className="uppercase"
            renderContent={({ isActive, isStatic }) => (
              <span
                className={cn(
                  isActive && 'text-primary-400',
                  !isActive && 'text-gray-600',
                  isStatic && 'text-gray-400',
                )}
              >
                {link.label}
              </span>
            )}
            {...link.props}
          />
        </li>
      ))}
    </ul>
  );
};

export default FooterMenu;
