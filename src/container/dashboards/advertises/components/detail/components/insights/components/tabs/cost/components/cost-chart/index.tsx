import { memo } from "react"
import isEqual from "react-fast-compare"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { currencyFormat } from "../../../../../../../../../../../../lib/currency-format";
import formatDate from "../../../../../../../../../../../../utils/date";

interface IChartData {
  name: string;
  cost: number;
  date: any;
}

interface Props {
  chartData: IChartData[]
}

const CostChart = (props: Props) => {
  const { chartData } = props;

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="cost" fill="#3B82F6" />
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
  if (active && payload?.length! > 0) {
    return (
      <div className="bg-white p-2 rounded-md">
        <p className="label font-bold">{`${label}`}</p>
        <p className="label text-emerald-400">{`Cost: ${currencyFormat(Number(payload?.[0].value))}`} VND</p>
        <p className="label">{`Date: ${payload?.[0].payload.date ? formatDate(payload?.[0].payload.date) : "-"}`}</p>
      </div>
    );
  }

  return null;
};

export default memo(CostChart, isEqual);
