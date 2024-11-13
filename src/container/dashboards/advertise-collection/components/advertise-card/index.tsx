import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import { IAdvertise } from "../../../../../types/advertise";
import { Link } from "react-router-dom";
import Skeleton from "./skeleton";
import AdvertiseDetail from "./detail";
import clsx from "clsx";

interface AdvertiseCardProps {
  ad: IAdvertise;
}

const AdvertiseCard = ({ ad }: AdvertiseCardProps) => {
  const [toggle, setToggle] = useState(false);

  if (!ad) return <Skeleton />;

  const handleToggleAdvertiseDetail = () => {
    setToggle(!toggle);
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
        <div className="relative h-40">
          <img
            src={ad.media_content}
            alt={ad.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className={clsx("absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold",
            ad.status === 'active' ? 'bg-green text-white' : 'bg-danger text-white')}>
            {ad.status}
          </div>
        </div>
        <div className="p-4 flex-grow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">{ad.title}</h2>
          <p className="text-sm text-gray-600 break-words">
            {ad.description.length < 100 ? (
              <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-lg break-words">
                {ad.description}
              </ReactMarkdown>
            ) : (
              <button
                onClick={handleToggleAdvertiseDetail}
                className="text-primary font-medium mt-2 focus:outline-none"
              >
                Read More
              </button>
            )}
          </p>
        </div>
        <div className="p-4 pt-0">
          <Link to={ad.link_action} className="w-full flex justify-center bg-primary text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">
            {ad.cta}
          </Link>
        </div>
      </div>

      {toggle && <AdvertiseDetail ad={ad} toggle={toggle} handleToggle={setToggle} />}
    </>
  )
}

export default memo(AdvertiseCard, isEqual);
