import { memo } from "react";
import { IResult } from "../../../../../../../types/advertise";
import InsightBlocks from "./components/insight-blocks";
import Tabs from "./components/tabs";
import isEqual from "react-fast-compare";

interface Props {
  result: IResult[]
}

const Insights = (props: Props) => {
  const { result } = props;

  return (
    <div className="flex flex-col gap-6">
      <InsightBlocks result={result} />
      <Tabs />
    </div>
  );
}

Insights.displayName = "Insights";

export default memo(Insights, isEqual)
