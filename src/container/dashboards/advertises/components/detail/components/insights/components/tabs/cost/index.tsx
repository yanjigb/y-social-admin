import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare"
import { GetById } from "../../../../../../../../../../services/ads.service";
import { GroupByDayOfWeek } from "./lib/group-by-day-of-week";
import CostChart from "./components/cost-chart";

interface IChartData {
  name: string;
  cost: number;
  date: any;
}

interface Props {
  advertiseID: string;
}


const Cost = (props: Props) => {
  const { advertiseID } = props;
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const fetchAdvertiseInsights = async () => {
    const response: any = await GetById(advertiseID);
    const filteredData = response.result;
    const dailyData = GroupByDayOfWeek(filteredData);
    setChartData(dailyData);
  };

  useEffect(() => {
    fetchAdvertiseInsights();
  }, [advertiseID]);

  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Advertise Cost</h3>
      <p className="text-sm text-gray-600 mb-4">Daily cost for the last 7 days</p>
      {
        chartData.length > 0 ? (
          <CostChart chartData={chartData} />
        ) : (
          <p className="text-sm text-gray-600">No data available</p>
        )
      }
    </div>
  )
}

export default memo(Cost, isEqual)