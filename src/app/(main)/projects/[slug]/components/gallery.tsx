import { type Project } from '@/lib/projects';
import { cn } from '@/lib/utils';
import ImgBox from '@/components/mdx/img-box';

interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The project data. */
  project: Project;
}

/**
 * Gallery component for displaying a grid of images.
 *
 * @param {GalleryProps} props - The component props.
 * @returns {JSX.Element} The gallery component.
 */
const Gallery = ({ project, className, ...props }: GalleryProps) => {
  return (
    <div className={cn('grid lg:grid-cols-2 gap-4', className)} {...props}>
      {project.data.gallery?.map((image, index) => (
        <ImgBox
          key={index}
          src={image.src}
          caption={image.caption}
          color={project.data.color}
          imgProps={{
            width: image.width,
            height: image.width && image.height ? (672 / image.width) * image.height : 0,
          }}
        />
      ))}
    </div>
  );
};

export default Gallery;
