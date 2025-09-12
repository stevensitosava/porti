import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx';

/**
 * Interface for project image data.
 */
export interface ProjectImage {
  /** The source URL of the image. */
  src: string;
  /** The width of the image. */
  width?: number;
  /** The height of the image. */
  height?: number;
  /** The caption of the image. */
  caption?: string;
}

export interface Project {
  /** The slug of the project. */
  slug: string;
  /** The frontmatter data of the project. */
  data: {
    /** The title of the project. */
    title: string;
    /** The description of the project. */
    description?: string;
    /** The date of the project. */
    date?: string;
    /** The type of the project. */
    type?: string;
    /** The services for the project. */
    services?: string[];
    /** Your role in the project. */
    role?: string;
    /** The tags associated with the project. */
    tags?: string[];
    /** URL to the live version of the project. */
    url?: string;
    /** The featured image of the project. */
    image?: ProjectImage;
    /** The background color of the project. */
    color?: string;
    /** Whether the project is featured. */
    featured?: boolean;
    /** Additional metadata for the project. */
    metadata: Metadata;
    /** The gallery images of the project. */
    gallery?: ProjectImage[];
  };
  /** The MDX content of the project. */
  content?: React.ReactElement;
}

/**
 * Interface for tag data, including the tag name and the count of projects associated with it.
 */
export interface ProjectTagData {
  /** The name of the tag. */
  name: string;
  /** The number of projects associated with this tag. */
  count: number;
}

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

let cachedProjects: Project[] | null = null;

/**
 * Reads and parses the content of a project MDX file.
 * @param {string} slug - The slug of the project.
 * @returns {Promise<Project>} A promise that resolves to Project object containing the MDX content and frontmatter data.
 */
export async function getProjectContent(slug: string) {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, 'utf8');
  const { content, frontmatter: data } = await compileMDX({
    source: fileContent,
    components,
    options: { parseFrontmatter: true },
  });

  return { slug, content, data } as Project;
}

/**
 * Gets all project slugs and their frontmatter data, sorted by date.
 * Caches the result for subsequent calls within the same request.
 * @returns {Promise<Array<{ slug: string; data: Record<string, any> }>>} A promise that resolves to an array of project metadata.
 */
export async function getAllProjects() {
  if (cachedProjects) {
    return cachedProjects;
  }

  const files = await fs.readdir(projectsDirectory);

  const projects = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '');
        const filePath = path.join(projectsDirectory, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContent);
        return { slug, data } as Project;
      }),
  );

  // Sort projects by date in descending order (newest first)
  projects.sort((a, b) => {
    const dateA = new Date(a.data.date || 0);
    const dateB = new Date(b.data.date || 0);
    return dateB.getTime() - dateA.getTime();
  });

  cachedProjects = projects;
  return projects;
}

/**
 * Gets the previous and next project relative to the current slug.
 * @param {string} currentSlug - The slug of the current project.
 * @returns {Promise<{ prevProject: Project | null; nextProject: Project | null }>} A promise that resolves to the previous and next project.
 */
export async function getPrevNextProjects(currentSlug: string) {
  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((project) => project.slug === currentSlug);

  let prevProject = null;
  let nextProject = null;

  if (currentIndex > 0) {
    prevProject = allProjects[currentIndex - 1];
  }

  if (currentIndex < allProjects.length - 1) {
    nextProject = allProjects[currentIndex + 1];
  }

  return { prevProject, nextProject };
}

/**
 * Gets projects for a specific page, including pagination details.
 * @param {number} page - The current page number.
 * @param {number} projectsPerPage - The number of projects to show per page.
 * @param {string} [tag] - Optional tag to filter projects by.
 * @returns {Promise<{ projects: Array<{ slug: string; data: Record<string, any> }>; hasNextPage: boolean; hasPrevPage: boolean; total: number }>} A promise that resolves to the projects for the current page and pagination flags.
 */
export async function getPaginatedProjects(page: number, projectsPerPage: number, tag?: string) {
  let projectsToPaginate = await getAllProjects();

  if (tag) {
    projectsToPaginate = projectsToPaginate.filter((project) => project.data.tags?.includes(tag));
  }

  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;

  const projects = projectsToPaginate.slice(startIndex, endIndex);
  const hasNextPage = endIndex < projectsToPaginate.length;
  const hasPrevPage = page > 1;

  return { projects, hasNextPage, hasPrevPage, total: projectsToPaginate.length };
}

/**
 * Gets all featured projects.
 * @returns {Promise<Array<{ slug: string; data: Record<string, any> }>>} A promise that resolves to an array of featured project metadata.
 */
export async function getFeaturedProjects() {
  const allProjects = await getAllProjects();
  const featuredProjects = allProjects.filter((project) => project.data.featured);

  return featuredProjects;
}

/**
 * Gets all unique tags from all projects with their respective project counts.
 * @returns {Promise<ProjectTagData[]>} A promise that resolves to an array of unique tags with their project counts.
 */
export async function getAllTags(): Promise<ProjectTagData[]> {
  const allProjects = await getAllProjects();
  const tagCounts: { [key: string]: number } = {};

  allProjects.forEach((project) => {
    project.data.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const tags: ProjectTagData[] = Object.keys(tagCounts).map((tag) => ({
    name: tag,
    count: tagCounts[tag],
  }));

  return tags.sort((a, b) => a.name.localeCompare(b.name));
}
