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

        <Typography variant="h4" fontWeight="bold" color="primary" className="flex items-center justify-between flex-1">
          {score}

          <div
            className={clsx(
              "py-1 px-2 text-white text-center rounded-md font-bold text-sm",
              advertiseScoreClassname
            )}
          >
            {label}
          </div>
        </Typography>
      </div>
    </div>
  )
}

export default memo(Score, isEqual)
