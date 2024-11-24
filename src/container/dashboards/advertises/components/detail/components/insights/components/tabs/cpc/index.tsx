import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare"
import { GetById } from "../../../../../../../../../../services/ads.service";
import { GroupByDayOfWeek } from "./lib/group-by-day-of-week";
import CpcChart from "./components/cpc-chart";

interface IChartData {
  name: string;
  date: any;
  cpc: number;
}

interface Props {
  advertiseID: string;
}

const CPC = (props: Props) => {
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
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Per Click (CPC)</h3>
      <p className="text-sm text-gray-600 mb-4">Daily CPC for the past week</p>
      {
        chartData.length > 0 ? (
          <CpcChart chartData={chartData} />
        ) : (
          <p className="text-sm text-gray-600">No data available</p>
        )
      }
    </div>
  )
}

export default memo(CPC, isEqual)
