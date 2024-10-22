import { Users } from "lucide-react"
import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare"
import { currencyFormat } from "../../../../../../../../../../lib/currency-format";
import { IResult } from "../../../../../../../../../../types/advertise";
import Skeleton from "./skeleton";

interface Props {
  result: IResult[]
}

const TotalClicks = (props: Props) => {
  const { result } = props;
  const [clicks, setTotalClicks] = useState(0);

  const getTotalClicks = () => {
    let total = 0;

    if (!result) return <Skeleton />

    result.forEach((item) => {
      total += item.clicks;
    });
    setTotalClicks(total);
  }

  useEffect(() => {
    getTotalClicks();
  }, [result]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
        <Users size={16} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{currencyFormat(clicks)}</div>
    </div>
  )
}

export default memo(TotalClicks, isEqual)
