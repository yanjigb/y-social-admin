import { Typography } from "@mui/material"
import clsx from "clsx";
import { memo } from "react"
import isEqual from "react-fast-compare"
import { CheckAdsTrending } from "../../../../../../../lib/check-ads-trending";

interface Props {
  score: number;
}


const Score = (props: Props) => {
  const { score } = props
  const { label, className: advertiseScoreClassname } = CheckAdsTrending(score);

  return (
    <div className="box">
      <div className="box-body flex items-center gap-4">
        <Typography variant="h6">
          Score:
        </Typography>

        <div className="flex items-center flex-1 gap-1">
          <Typography variant="h4" fontWeight="bold" color="primary">
            {score}
          </Typography>
          <span>/ 100</span>
        </div>

        <div
          className={clsx(
            "py-1 px-2 text-white text-center rounded-md font-bold text-sm",
            advertiseScoreClassname
          )}
        >
          {label}
        </div>
      </div>
    </div>
  )
}

export default memo(Score, isEqual)
