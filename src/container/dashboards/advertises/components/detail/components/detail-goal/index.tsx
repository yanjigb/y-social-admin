import { Typography } from "@mui/material"
import { memo } from "react"
import isEqual from "react-fast-compare"
import Skeleton from "./skeleton";

interface Props {
  goal: string;
}

const DetailGoal = (props: Props) => {
  const { goal } = props;

  if (!goal) return <Skeleton />

  return (
    <div className="flex flex-col gap-1">
      <Typography variant="caption">Advertise Goal:</Typography>
      <span className="font-semibold text-lg">
        {goal}
      </span>
    </div>
  )
}

export default memo(DetailGoal, isEqual)
