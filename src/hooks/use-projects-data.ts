import { useCallback, useEffect, useRef, useState } from 'react';
import { type Project } from '@/lib/projects';

/**
 * @interface UseProjectsDataProps
 * @description Props for the useProjectsData hook.
 */
interface UseProjectsDataProps {
  /** An array of initial project data. */
  initialProjects: Project[];
  /** The number of projects to display per page. */
  perPage: number;
  /** The total number of projects available. */
  total: number;
  /** The current filter tag. */
  tag: string | null;
}

/**
 * @interface UseProjectsDataReturn
 * @description Return type for the useProjectsData hook.
 */
interface UseProjectsDataReturn {
  /** The current list of projects. */
  projects: Project[];
  /** The current page number. */
  page: number;
  /** Indicates if there are more projects to load. */
  hasMore: boolean;
  /** Ref for the loader element to trigger infinite scrolling. */
  loaderRef: React.RefObject<HTMLDivElement | null>;
  /** The total number of projects after filtering. */
  totalProjects: number;
}

/**
 * @function useProjectsData
 * @description A custom hook for fetching and managing project data with infinite scrolling.
 * @param {UseProjectsDataProps} props - The props for the hook.
 * @returns {UseProjectsDataReturn} The managed project data and loader ref.
 */
const useProjectsData = ({
  initialProjects,
  perPage,
  total,
  tag,
}: UseProjectsDataProps): UseProjectsDataReturn => {
  const [projects, setProjects] = useState(initialProjects);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(1 * perPage < total);
  const [totalProjects, setTotalProjects] = useState(total);
  const prevTagRef = useRef<string | null>(tag);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  /**
   * Fetches projects from the API and updates the state.
   * @param {number} fetchPage - The page number to fetch.
   * @param {boolean} append - Whether to append new projects to the existing list or replace them.
   */
  const fetchProjects = useCallback(
    async (fetchPage: number, append: boolean) => {
      const tagQuery = tag ? `&tag=${tag}` : '';
      const res = await fetch(`/api/projects?page=${fetchPage}&perPage=${perPage}${tagQuery}`);
      const data = await res.json();

      if (append) {
        setProjects((prevProjects) => [...prevProjects, ...data.projects]);
      } else {
        setProjects(data.projects);
      }
      setPage(fetchPage);
      setHasMore(fetchPage * perPage < data.total);
      setTotalProjects(data.total);
    },
    [tag, perPage],
  );

  // Effect to reset projects and fetch initial data when filter change
  useEffect(() => {
    if (prevTagRef.current !== tag) fetchProjects(1, false);
    prevTagRef.current = tag;
  }, [tag, fetchProjects]);

  // Effect for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          fetchProjects(page + 1, true);
        }
      },
      { rootMargin: '200%' },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [page, hasMore, perPage, totalProjects, tag, fetchProjects]);

  return { projects, page, hasMore, loaderRef, totalProjects };
};

export default useProjectsData;
