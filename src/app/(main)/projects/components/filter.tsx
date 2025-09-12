'use client';

import gsap from 'gsap';
import { useRef, useCallback } from 'react';
import { useAppContext } from '@/context/app-context';
import { SLIDE_VARS } from '@/lib/gsap';
import { type ProjectTagData } from '@/lib/projects';
import { cn } from '@/lib/utils';
import Modal from '@/components/ui/modal';
import HoverSlideUp from '@/components/ui/hover-slide-up';

/**
 * Props for the Filter component.
 * @interface FilterProps
 */
interface FilterProps {
  /** An array of tag data to display as filter options. */
  tags: ProjectTagData[];
}

/**
 * Renders a filter modal for projects, allowing selection by tags.
 *
 * @param {FilterProps} { tags } - The props object containing tags data.
 * @returns {JSX.Element} The rendered Filter component.
 */
const Filter = ({ tags }: FilterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { modalOpen, setModalOpen, projectFilter, setProjectFilter } = useAppContext();

  /**
   * Handles the opening animation of the filter modal.
   * Initializes GSAP animations for title, subtitle, and description.
   * @function handleOpen
   * @returns {void}
   */
  const handleOpen = () => {
    const from = { ...SLIDE_VARS, x: '5vh', opacity: 0 };
    const to = { ...SLIDE_VARS, x: 0, opacity: 1, stagger: 0.05 };

    const tl = gsap.timeline({ delay: 0.6 });
    tl.fromTo('[data-title], li', from, to);
  };

  /**
   * Handles the filtering of projects by tag.
   * Sets the project filter in the app context and closes the modal.
   * @param {string | null} tag - The tag name to filter by, or null to show all projects.
   * @returns {void}
   */
  const handleFilter = useCallback(
    (tag: string | null) => {
      setProjectFilter({ tag });
      setModalOpen(null);
    },
    [setProjectFilter, setModalOpen],
  );

  return (
    <Modal
      isOpen={modalOpen === 'project-filter'}
      onOpen={handleOpen}
      onClose={() => setModalOpen(null)}
    >
      <div
        className={cn('section-container', 'py-8 xl:py-20', 'space-y-8 lg:space-y-20')}
        ref={ref}
      >
        <h2 data-title>Filter</h2>

        <ul
          className={cn(
            'flex flex-col',
            'text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-400 tracking-tight leading-none uppercase',
          )}
        >
          {tags.map((tag) => (
            <li
              key={tag.name}
              className={cn(
                'lg:grid grid-cols-4 gap-8 lg:gap-4',
                'w-full',
                'group',
                projectFilter.tag === tag.name && 'text-white',
              )}
            >
              <div className={cn('hidden lg:block', 'overflow-hidden')}>
                <div
                  className={cn(
                    projectFilter.tag !== tag.name && 'translate-y-full group-hover:translate-y-0',
                    'transition-transform duration-300',
                  )}
                >
                  {tag.count}
                </div>
              </div>

              <div className="col-span-3">
                {projectFilter.tag === tag.name ? (
                  tag.name
                ) : (
                  <button
                    className={cn('uppercase text-left', 'cursor-pointer')}
                    onClick={() => handleFilter(tag.name)}
                  >
                    <HoverSlideUp
                      renderContent={({ isActive }) => (
                        <span className={cn(isActive && 'text-primary-500')}>{tag.name}</span>
                      )}
                    />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default Filter;
