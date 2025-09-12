import { getFeaturedProjects } from '@/lib/projects';
import View from './components/view';

/**
 * Renders the home page.
 * This is an asynchronous component that fetches featured projects and passes them to the View component.
 * @returns {Promise<JSX.Element>} A promise that resolves to the JSX element for the home page.
 */
const Page = async () => {
  const featuredProjects = await getFeaturedProjects();
  return <View featuredProjects={featuredProjects} />;
};

export default Page;
