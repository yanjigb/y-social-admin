import { Percent } from "lucide-react"
import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare"
import InfoIcon from '@mui/icons-material/Info';
import { IResult } from "../../../../../../../../../../types/advertise";
import { currencyFormat } from "../../../../../../../../../../lib/currency-format";
import Skeleton from "./skeleton";
import { HtmlTooltip } from "../../../../../../../../../../components/ui/html-tooltip";
import { Fade } from "@mui/material";
import calculateAverageCTR from "./lib/calculate-average-ctr";

interface Props {
  result: IResult[]
}

const AverageCTR = (props: Props) => {
  const { result } = props;
  const [averageCTR, setAverageCTR] = useState(0);

  const getAverageCTR = () => {
    if (!result) return <Skeleton />
    const averageCTR = calculateAverageCTR(result);
    setAverageCTR(averageCTR);
  }

  useEffect(() => {
    getAverageCTR();
  }, [result]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-500">Average CTR</h3>

          <HtmlTooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="top-start"
            title={
              <>
                <b>How we calculate:</b>
                <p>Average CTR = total CTR / all result length of this advertise</p>
              </>
            }
          >
            <InfoIcon sx={{ fontSize: 20 }} />
          </HtmlTooltip>
        </div>
        <Percent size={16} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{currencyFormat(averageCTR)}%</div>
    </div>
  )
}

export default memo(AverageCTR, isEqual)
