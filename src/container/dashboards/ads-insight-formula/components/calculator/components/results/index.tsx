import { memo } from "react";
import isEqual from "react-fast-compare";
import { currencyFormat } from "../../../../../../../lib/currency-format";

interface Props {
  costPerClick: number;
  costPerImpression: number;
  discountAmount: number;
  costBeforeDiscount: number;
  finalCost: number;
  discountPercentage: number | string;
}

const Results = (props: Props) => {
  const { costPerClick, costPerImpression, discountAmount, costBeforeDiscount, finalCost, discountPercentage } = props;

  return (
    <div className="text-base">
      <h3 className="text-xl font-bold mb-2">Results:</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <p>Cost per Click (CPC)</p>
          <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">{currencyFormat(costPerClick)} VND</span>
        </div>
        <div className="flex flex-col gap-2">
          <p>Cost per Impression (CPM)</p>
          <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">{currencyFormat(costPerImpression)} VND</span>
        </div>
        <div className="flex flex-col gap-2">
          <p>Cost before discount</p>
          <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">{currencyFormat(costBeforeDiscount)} VND</span>
        </div>
        <div className="flex flex-col gap-2">
          <p>Discount: {discountPercentage}%</p>
          <span className="bg-slate-100 flex flex-1 p-2 px-3 rounded-md">{currencyFormat(discountAmount)} VND</span>
        </div>
        <div className="flex flex-col gap-1 col-span-2">
          <strong>Final Cost</strong>
          <span className="bg-slate-100 flex p-2 px-3 rounded-md">{currencyFormat(finalCost)} VND</span>
        </div>
      </div>
    </div>
  )
}

export default memo(Results, isEqual);
