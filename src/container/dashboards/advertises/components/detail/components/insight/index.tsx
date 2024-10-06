import { Typography } from "@mui/material";
import { currencytFormat } from "../../../../../../../lib/currency-format";
import { memo } from "react";
import isEqual from "react-fast-compare";
import { IResult } from "../../../../../../../types/advertise";

interface Props {
  result: IResult[];
}

const Insight = (props: Props) => {
  const { result } = props;

  const totalImpressions = result?.reduce((acc, curr) => acc + curr.impressions, 0);
  const totalClicks = result?.reduce((acc, curr) => acc + curr.clicks, 0);
  const totalCTR = result?.reduce((acc, curr) => acc + curr.ctr, 0);

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h5" fontWeight="bold">
        Advertise Insight
      </Typography>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="box">
          <div className="box-body">
            <div className="flex flex-col gap-4">
              <h6>
                Total Impressions
              </h6>

              <Typography variant="h3" fontWeight="bold">{currencytFormat(totalImpressions)}</Typography>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="box-body">
            <div className="flex flex-col gap-4">
              <h6>
                Total Clicks
              </h6>

              <Typography variant="h3" fontWeight="bold">{currencytFormat(totalClicks)}</Typography>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="box-body">
            <div className="flex flex-col gap-4">
              <h6>
                Average CTR
              </h6>

              <Typography variant="h3" fontWeight="bold">{currencytFormat(totalCTR)}%</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Insight, isEqual);
