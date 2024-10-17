import { memo } from "react"
import isEqual from "react-fast-compare"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "./skeleton";

interface Props {
  media_content: string;
  media_title: string;
  title: string;
  description: string;
  cta: string;
}

const AdvertiseCard = (props: Props) => {
  const { media_content, media_title, title, description, cta } = props

  if (!media_content || !media_title || !title || !description || !cta) {
    return <Skeleton />;
  }

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <LazyLoadImage src={media_content} title={media_title} className="object-cover aspect-video h-full w-full max-w-full max-h-[19.8125rem]" />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
        <button className="w-full bg-sky-500 hover:bg-blue-700 text-lg text-white font-bold py-4 px-4 rounded">
          {cta}
        </button>
      </div>
    </div>
  )
}

export default memo(AdvertiseCard, isEqual)
