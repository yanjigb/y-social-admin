import { Typography } from "@mui/material";
import { currencytFormat } from "../../../../../../lib/currency-format";

interface Props {
}

export default function Insight() {
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

              <Typography variant="h3" fontWeight="bold">{currencytFormat(123)}</Typography>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="box-body">
            <div className="flex flex-col gap-4">
              <h6>
                Total Clicks
              </h6>

              <Typography variant="h3" fontWeight="bold">{currencytFormat(123)}</Typography>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="box-body">
            <div className="flex flex-col gap-4">
              <h6>
                Average CTR
              </h6>

              <Typography variant="h3" fontWeight="bold">{currencytFormat(123)}%</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
