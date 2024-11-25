import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare"
import { GetById } from "../../../../../../../../../../services/ads.service";
import { GroupByDayOfWeek } from "./lib/group-by-day-of-week";
import CpiChart from "./components/cpi-chart";

interface IChartData {
  name: string;
  date: any;
  cpm: number;
  impressions: number;
}

interface Props {
  advertiseID: string;
}

const CPM = (props: Props) => {
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
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Per Impression (CPI)</h3>
      <p className="text-sm text-gray-600 mb-4">Daily CPI for the last 7 days</p>
      {
        chartData.length > 0 ? (
          <CpiChart chartData={chartData} />
        ) : (
          <p className="text-sm text-gray-600">No data available</p>
        )
      }
    </div>
  )
}

export default memo(CPM, isEqual)
