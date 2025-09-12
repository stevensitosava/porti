import { siteConfig } from '@/config/site';
import { getProjectContent, getPrevNextProjects, getAllProjects } from '@/lib/projects';
import View from './components/view';

/**
 * Renders a project page based on the provided slug.
 * @param {object} props - The component props.
 * @param {{ slug: string }} props.params - The dynamic parameters containing the project slug.
 * @returns {Promise<JSX.Element>} A promise that resolves to the Project component.
 */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectContent(slug);
  const { prevProject, nextProject } = await getPrevNextProjects(slug);

  return <View project={project} prevProject={prevProject} nextProject={nextProject} />;
}

/**
 * Generates metadata for a project page based on the provided slug.
 * Fetches project content and returns an object containing the title and description.
 * @param {object} params - The function parameters.
 * @param {string} params.slug - The slug of the project.
 * @returns {Promise<{ title: string; description?: string }>} A promise that resolves to the metadata object.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectContent(slug);

  return {
    title: `${project.data.title} | ${siteConfig.name}`,
    description: project.data.description,
    ...project.data.metadata,
  };
}

/**
 * Generates static paths for all project pages.
 * Uses getAllProjects to get all slugs.
 * @returns {Promise<Array<{ slug: string }>>} A promise that resolves to an array of slugs.
 */
export async function generateStaticParams() {
  const allProjects = await getAllProjects();
  const slugs = allProjects.map((project) => ({ slug: project.slug }));
  return slugs;
}

export const dynamicParams = false;
