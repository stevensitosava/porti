'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image, { ImageProps } from 'next/image';
import { useRef } from 'react';
import { toScrollGrayscale } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * @interface ImgProps
 * @augments React.HTMLAttributes<HTMLDivElement>
 */
interface ImgProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The image source URL */
  src: string;
  /** The alt text for the image. Defaults to caption if not provided */
  alt?: string;
  /** The width of the image in pixels */
  width?: number;
  /** The height of the image in pixels */
  height?: number;
  /** Additional props to pass to the Next.js Image component */
  imgProps?: Partial<ImageProps>;
}

/**
 * Img component for displaying images with animations.
 *
 * @param {ImgProps} props - The properties for the Img component.
 * @returns {JSX.Element} A div element containing the image and its caption.
 */
const Img = ({ src, alt, width = 1920, height = 0, imgProps, className, ...props }: ImgProps) => {
  const { className: imageClassName = '', ...restImgProps } = imgProps ?? {};
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      tlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        },
      });
      tlRef.current.fromTo('img', { scale: 1.5 }, { scale: 1, duration: 2 }, '<');

      toScrollGrayscale(ref.current);
    },
    { scope: ref },
  );

  return (
    <div
      className={cn('relative overflow-hidden', 'w-full', 'not-prose', className)}
      ref={ref}
      {...props}
    >
      <Image
        className={cn('mx-auto', 'object-cover object-top', imageClassName)}
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        sizes="(width < 64rem) 1024px, 1920px"
        onLoad={() => tlRef.current?.scrollTrigger?.refresh()}
        {...restImgProps}
      />
    </div>
  );
};

export default Img;
