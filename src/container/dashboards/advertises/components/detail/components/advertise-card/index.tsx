import { memo, useState } from "react"
import isEqual from "react-fast-compare"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "./skeleton";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

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
  const [isExpanded, setIsExpanded] = useState(false);

  if (!media_content || !media_title || !title || !description || !cta) {
    return <Skeleton />;
  }

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <LazyLoadImage src={media_content} title={media_title} className="object-cover aspect-video h-full w-full max-w-full max-h-[19.8125rem]" />

      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {description.length < 100 ? (
          <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-lg">
            {description}
          </ReactMarkdown>
        ) : (
          <>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-lg">
              {isExpanded
                ? description
                : description.slice(0, 100) + "..."}
            </ReactMarkdown>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary font-medium mt-2 focus:outline-none"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          </>
        )}
        <Link to={link_action} className="w-full mt-2 text-center block bg-sky-500 hover:bg-sky-400 text-lg text-white font-bold py-4 px-4 rounded-lg">
          {cta}
        </Link>
      </div>
    </div>
  )
}

export default memo(AdvertiseCard, isEqual)
