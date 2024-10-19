import { memo } from "react"
import isEqual from "react-fast-compare"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "./skeleton";
import { Link } from "react-router-dom";

interface Props {
  media_content: string;
  media_title: string;
  title: string;
  description: string;
  cta: string;
  link_action: string;
}

const AdvertiseCard = (props: Props) => {
  const { media_content, media_title, title, description, cta, link_action } = props

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
        <Link to={link_action} className="w-full text-center block bg-sky-500 hover:bg-sky-400 text-lg text-white font-bold py-4 px-4 rounded-xl">
          {cta}
        </Link>
      </div>
    </div>
  )
}

export default memo(AdvertiseCard, isEqual)
