import { Users } from "lucide-react"
import { memo } from "react"
import isEqual from "react-fast-compare"
import { currencyFormat } from "../../../../../../../../../../lib/currency-format";

const TotalClicks = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
        <Users size={16} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{currencyFormat(123)}</div>
    </div>
  )
}

export default memo(TotalClicks, isEqual)
