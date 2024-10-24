import { Percent } from "lucide-react"
import { memo, useEffect, useState } from "react"
import isEqual from "react-fast-compare"
import { IResult } from "../../../../../../../../../../types/advertise";
import { currencyFormat } from "../../../../../../../../../../lib/currency-format";
import Skeleton from "./skeleton";

interface Props {
  result: IResult[]
}

const AverageCTR = (props: Props) => {
  const { result } = props;
  const [averageCTR, setAverageCTR] = useState(0);

  const getAverageCTR = () => {
    let total = 0;

    if (!result) return <Skeleton />

    result.forEach((item) => {
      total += item.ctr;
    });
    setAverageCTR(total / result.length);
  }

  useEffect(() => {
    getAverageCTR();
  }, [result]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">Average CTR</h3>
        <Percent size={16} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{currencyFormat(averageCTR)}%</div>
    </div>
  )
}

export default memo(AverageCTR, isEqual)
