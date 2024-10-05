import { Typography } from "@mui/material";
import InsightDataTable from "./insight-data-table";
import { IResult, TCurrency } from "../../../../../../../types/advertise";
import { memo } from "react";
import isEqual from "react-fast-compare";

interface Props {
  result: IResult[];
  currency: TCurrency;
}

const DailyPerformance = (props: Props) => {
  const { result, currency } = props;

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h5" fontWeight="bold">
        Advertise Insight
      </Typography>

      <InsightDataTable result={result} currency={currency} />
    </div>
  );
};

export default memo(DailyPerformance, isEqual);
