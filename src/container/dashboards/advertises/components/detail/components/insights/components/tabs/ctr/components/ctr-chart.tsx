import { memo } from "react"
import isEqual from "react-fast-compare"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { currencyFormat } from "../../../../../../../../../../../lib/currency-format";
import formatDate from "../../../../../../../../../../../utils/date";

interface IChartData {
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  date: any;
  ctr: number;
}

interface Props {
  chartData: IChartData[]
}

const CTRChart = (props: Props) => {
  const { chartData } = props;

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="ctr" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="bg-white p-2 rounded-md">
        <p className="label font-bold">{`${label}`}</p>
        <p className="label text-emerald-400">
          {`CTR: ${currencyFormat(Number(payload?.[0].value))}`}%
        </p>
        <p className="label">
          {`Date: ${payload?.[0].payload.date ? formatDate(payload?.[0].payload.date) : "-"}`}
        </p>
      </div>
    );
  }

  return null;
};

CTRChart.displayName = "CTRChart"

export default memo(CTRChart, isEqual)
