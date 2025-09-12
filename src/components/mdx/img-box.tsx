'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image, { ImageProps } from 'next/image';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { toScrollGrayscale, toScrollIn } from '@/lib/gsap';
import PortfolioBg from '@/components/ui/portfolio-bg';

/**
 * @interface ImgBoxProps
 * @augments React.HTMLAttributes<HTMLDivElement>
 */
interface ImgBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The image source URL */
  src: string;
  /** The alt text for the image. Defaults to caption if not provided */
  alt?: string;
  /** The caption displayed below the image */
  caption?: string;
  /**
   * The background color of the image box
   * @default 'black'
   */
  color?: string;
  /** Additional props to pass to the Next.js Image component */
  imgProps?: Partial<ImageProps>;
}

/**
 * ImgBox component for displaying images with captions.
 *
 * @param {ImgBoxProps} props - The properties for the ImgBox component.
 * @returns {JSX.Element} A div element containing the image and its caption.
 */
const ImgBox = ({
  src,
  alt,
  caption,
  color = 'black',
  imgProps,
  className,
  ...props
}: ImgBoxProps) => {
  const { className: imageClassName = '', ...restImgProps } = imgProps ?? {};
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      toScrollIn(ref.current?.querySelector('figcaption'));
      toScrollGrayscale(ref.current);

      tlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current?.querySelector('figure div'),
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        },
      });
      tlRef.current.fromTo(
        'figure div',
        { scale: 0.75, y: '5vh' },
        { scale: 1, y: 0, duration: 2 },
      );
      tlRef.current.fromTo('img', { scale: 1.5 }, { scale: 1, duration: 2 }, '<');
    },
    { scope: ref },
  );

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'w-full lg:h-screen',
        'flex flex-col justify-center items-center',
        'py-8 lg:py-0 px-8 lg:px-20',
        className,
      )}
      ref={ref}
      {...props}
    >
      <PortfolioBg className={cn('w-full h-full', 'absolute inset-x-0 top-0')} color={color} />

      <figure className={cn('flex flex-col gap-8', 'max-h-full', 'not-prose', caption && 'flex-1')}>
        {caption && (
          <figcaption className={cn('flex-1', 'lg:pt-20', 'lg:text-xl font-medium  text-white')}>
            {caption}
          </figcaption>
        )}

        <div className={cn('overflow-hidden', 'lg:shadow-2xl shadow-black/10', 'origin-bottom')}>
          <Image
            className={cn('object-cover object-top', imageClassName)}
            src={src}
            alt={alt ?? caption ?? ''}
            width={672}
            height={0}
            sizes="(width < 64rem) 384px, 672px"
            onLoad={() => tlRef.current?.scrollTrigger?.refresh()}
            {...restImgProps}
          />
        </div>
      </figure>
    </div>
  );
};

export default ImgBox;
