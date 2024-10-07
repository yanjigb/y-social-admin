import { Typography } from "@mui/material";
import { currencyFormat } from "../../../../../../../lib/currency-format";
import { memo } from "react";
import isEqual from "react-fast-compare";
import { IResult } from "../../../../../../../types/advertise";
import Skeleton from "./skeleton";

interface Props {
  result: IResult[];
}

const Insight = (props: Props) => {
  const { result } = props;

  const totalImpressions = result?.reduce((acc, curr) => acc + curr.impressions, 0);
  const totalClicks = result?.reduce((acc, curr) => acc + curr.clicks, 0);
  const totalCTR = result?.reduce((acc, curr) => acc + curr.ctr, 0);

  if (!result) return <Skeleton />

  return (
    <div className="grid xl:grid-cols-3 gap-6">
      <div className="box">
        <div className="box-body">
          <div className="flex flex-col gap-4">
            <h6>
              Total Impressions
            </h6>

            <Typography variant="h3" fontWeight="bold">{currencyFormat(totalImpressions)}</Typography>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="box-body">
          <div className="flex flex-col gap-4">
            <h6>
              Total Clicks
            </h6>

            <Typography variant="h3" fontWeight="bold">{currencyFormat(totalClicks)}</Typography>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="box-body">
          <div className="flex flex-col gap-4">
            <h6>
              Average CTR
            </h6>

            <Typography variant="h3" fontWeight="bold">{currencyFormat(totalCTR)}%</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Insight, isEqual);
