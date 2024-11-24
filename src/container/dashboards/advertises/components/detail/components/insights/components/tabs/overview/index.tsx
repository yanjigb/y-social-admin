import { memo } from "react"
import isEqual from "react-fast-compare"

import Ctr from "../ctr"
import Cpc from "../cpc"
import Cost from "../cost";
import Cpi from "../cpi";

interface Props {
  advertiseID: string;
}

const Overview = (props: Props) => {
  const { advertiseID } = props;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <Cost advertiseID={advertiseID} />
      <Cpc advertiseID={advertiseID} />
      <Cpi advertiseID={advertiseID} />
      <Ctr advertiseID={advertiseID} />
    </div>
  )
}

export default memo(Overview, isEqual)
