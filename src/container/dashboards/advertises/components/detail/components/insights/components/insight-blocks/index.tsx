import { memo } from "react"
import isEqual from "react-fast-compare"
import TotalClicks from "./total-clicks"
import TotalImpression from "./total-impression"
import TotalConversation from "./total-conversation"
import { Typography } from "@mui/material"

const InsightBlocks = () => {
  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h5" fontWeight="bold">
        Advertise Insight
      </Typography>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
        <TotalImpression />
        <TotalClicks />
        <TotalConversation />
      </div>
    </div>
  )
}

export default memo(InsightBlocks, isEqual)
