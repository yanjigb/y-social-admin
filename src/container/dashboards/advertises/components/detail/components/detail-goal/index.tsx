import { memo } from "react"
import isEqual from "react-fast-compare"
import Skeleton from "./skeleton";
import { Flag  } from "lucide-react";

interface Props {
  goal: string;
}

const DetailGoal = (props: Props) => {
  const { goal } = props;

  if (!goal) return <Skeleton />

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col gap-2 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">
          Advertise Goal
        </span>
        <Flag size={16} />
      </div>
      <span className="font-semibold text-lg">
        {goal}
      </span>
    </div>
  )
}

export default memo(DetailGoal, isEqual)
