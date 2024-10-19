import InsightBlocks from "./components/insight-blocks";
import Tabs from "./components/tabs";
// interface Props {
// }

export default function Insights() {
  return (
    <div className="flex flex-col gap-6">
      <InsightBlocks />
      <Tabs />
    </div>
  );
}
