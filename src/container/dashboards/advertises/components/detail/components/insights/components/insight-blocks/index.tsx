import { memo } from "react"
import isEqual from "react-fast-compare"
import TotalClicks from "./total-clicks"
import TotalImpression from "./total-impression"
import AverageCTR from "./average-ctr"
import { Typography } from "@mui/material"
import { IResult } from "../../../../../../../../../types/advertise";

interface Props {
  result: IResult[]
}

const InsightBlocks = (props: Props) => {
  const { result } = props;

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h5" fontWeight="bold">
        Advertise Insight
      </Typography>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
        <TotalImpression result={result} />
        <TotalClicks result={result} />
        <AverageCTR result={result} />
      </div>
    </div>
  )
}

export default memo(InsightBlocks, isEqual)
