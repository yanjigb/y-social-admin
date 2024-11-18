import { memo } from "react"
import isEqual from "react-fast-compare"
import Skeleton from "./skeleton";
import { Link } from "lucide-react";

interface Props {
  url: string;
}

const LinkAction = (props: Props) => {
  const { url } = props;

  if (!url) return <Skeleton />

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col gap-2 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">
          Link Action
        </span>
        <Link size={16} />
      </div>
      <div className="font-semibold text-sm text-wrap max-w-full truncate">
        {url}
      </div>
    </div>
  )
}

export default memo(LinkAction, isEqual)
