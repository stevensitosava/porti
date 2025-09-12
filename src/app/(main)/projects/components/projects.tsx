import PortfolioProject from '@/app/(main)/(home)/components/portfolio-project';
import { type Project } from '@/lib/projects';

/**
 * @interface ProjectsProps
 * @description Props for the Projects component.
 */
interface ProjectsProps {
  /** An array of project data to display. */
  projects: Project[];
  /** The total number of projects available. */
  total: number;
}

/**
 * @function Projects
 * @description A React functional component that renders a list of PortfolioProject components.
 * @param {ProjectsProps} props - The props for the Projects component.
 * @returns {JSX.Element[]} An array of rendered PortfolioProject components.
 */
const Projects = ({ projects, total }: ProjectsProps) => {
  return projects.map((project, i) => (
    <PortfolioProject key={project.slug} project={project} number={i + 1} total={total} />
  ));
};

export default Projects;
