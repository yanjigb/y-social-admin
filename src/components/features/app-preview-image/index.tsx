import { FC, memo } from "react";
import isEqual from "react-fast-compare";
import { clsx } from 'clsx';

interface AppPreviewImageProps {
  imgSrc: string
  width: string
  height: string
  alt: string
  className?: string
}

const AppPreviewImage: FC<AppPreviewImageProps> = ({ imgSrc, width, height, alt, className }) => {
  return <img
    src={imgSrc || '/images/default-avatar.svg#id'}
    loading="lazy"
    decoding="async"
    alt={alt}
    style={{
      maxWidth: `${width}px`,
      maxHeight: `${height}px`,
    }}
    className={clsx("aspect-video object-cover", className)}
  />
};

export default memo(AppPreviewImage, isEqual);
