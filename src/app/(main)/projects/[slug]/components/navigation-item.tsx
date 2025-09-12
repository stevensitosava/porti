import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import TransitionLink from '@/components/ui/transition-link';
import { type Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface NavigationItemProps {
  project: Project;
  mode: 'prev' | 'next';
}

const NavigationItem = ({ project, mode }: NavigationItemProps) => {
  return (
    <TransitionLink href={`/projects/${project.slug}`} className={cn('flex', 'group')}>
      <span className={cn('shrink-0', 'hidden xl:block', 'relative', 'w-28 h-20')}>
        <figure className={cn('h-full', 'absolute inset-x-0 bottom-0', 'overflow-hidden')}>
          {project.data.image && (
            <Image
              src={project.data.image.src}
              alt={project.data.title}
              width={112}
              height={80}
              className={cn(
                'w-full h-full',
                'object-cover',
                'transition-transform duration-300',
                'translate-y-full group-hover:translate-y-0',
              )}
            />
          )}
        </figure>
      </span>

      <span className={cn('flex-1', 'lg:px-8 lg:py-4', 'bg-white')}>
        <span className={cn('flex gap-1', 'text-[0.6875rem] lg:text-xs uppercase tracking-wider')}>
          {mode === 'prev' ? (
            <>
              <ArrowDownLeft className="w-4 h-4" /> Prev
            </>
          ) : (
            <>
              Next <ArrowUpRight className="w-4 h-4" />
            </>
          )}
        </span>

        <span
          className={cn(
            'block',
            'relative overflow-hidden',
            'xl:text-xl font-medium text-gray-800',
          )}
        >
          <span
            className={cn(
              'inline-flex',
              'border-b border-transparent',
              'line-clamp-2',
              'transition-transform duration-300',
              'group-hover:-translate-y-full',
            )}
          >
            {project.data.title}
          </span>
          <span
            className={cn(
              'absolute top-0 left-0',
              'translate-y-full',
              'border-b border-current',
              'line-clamp-2',
              'transition-transform duration-300',
              'group-hover:translate-y-0',
            )}
            aria-hidden
            data-nosnippet
          >
            {project.data.title}
          </span>
        </span>
      </span>
    </TransitionLink>
  );
};

export default NavigationItem;
