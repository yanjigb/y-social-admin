import { memo } from "react"
import isEqual from "react-fast-compare"
// import Skeleton from "./skeleton";
import { BookA } from "lucide-react";

interface Props {
  topic: string;
}

const Topic = (props: Props) => {
  const { topic } = props;

  // if (!topic) return <Skeleton />

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col gap-2 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">
          Topic
        </span>
        <BookA size={16} />
      </div>
      <div className="font-semibold text-sm text-wrap max-w-full">
        {topic}
      </div>
    </div>
  )
}

export default memo(Topic, isEqual)
