import { memo } from "react"
import isEqual from "react-fast-compare"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { currencyFormat } from "../../../../../../../../../../../../lib/currency-format";
import formatDate from "../../../../../../../../../../../../utils/date";

interface IChartData {
  name: string;
  cpm: number;
  impressions: number;
  date: any;
}

interface Props {
  chartData: IChartData[]
}

const CpiChart = (props: Props) => {
  const { chartData } = props;

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="cpm" stroke="#10B981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload?.length! > 0) {
    return (
      <div className="bg-white p-2 rounded-md">
        <p className="label font-bold">{`${label}`}</p>
        <p className="label text-emerald-400">{`CPM: ${currencyFormat(Number(payload?.[0].payload.cpm))}`} VND</p>
        <p className="label text-primary">{`Impressions: ${payload?.[0].payload.impressions}`}</p>
        <p className="label">{`Date: ${payload?.[0].payload.date ? formatDate(payload?.[0].payload.date) : "-"}`}</p>
      </div>
    );
  }

  return null;
};

export default memo(CpiChart, isEqual);
