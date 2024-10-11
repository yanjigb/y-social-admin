import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import { FC, memo } from "react";
import isEqual from "react-fast-compare";

const photoStyles = {
  width: "calc(100%)",
};

const videoStyles = {
  height: "30rem",
  width: "100%",
  aspectRatio: "16/9",
};

const videoProps = {
  preload: "metadata",
  controls: true,
  draggable: false,
  muted: true,
  autoPlay: true,
  loop: true,
};

const lazyLoadImageProps = (label: string, imageSrc: string) => {
  return {
    alt: label,
    src: imageSrc,
    effect: "blur",
    className: "w-100 h-100",
    height: "100%",
  };
};

interface AppMediaProps {
  imageSrc?: string,
  label?: string,
  videoSrc?: string,
  isVideo?: boolean,
}

const AppMedia: FC<AppMediaProps> = ({
  imageSrc = "",
  label = "",
  videoSrc = "",
  isVideo = false,
}) => {
  return (
    <>
      {isVideo ? (
        <div className="max-w-[18.75rem]" style={videoStyles}>
          <LazyLoadComponent>
            <video {...videoProps}>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </LazyLoadComponent>
        </div>
      ) : (
        <a href={imageSrc} target="_blank" className="w-full" style={photoStyles} rel="noreferrer">
          <LazyLoadImage {...lazyLoadImageProps} src={imageSrc} title={label} className="object-cover aspect-video" width={500} height={500} />
        </a>
      )}
    </>
  );
};

export default memo(AppMedia, isEqual);
