import { memo } from "react"
import isEqual from "react-fast-compare"
import { EAdvertiseStatus } from "../../../../../../../types/advertise"
import NotEnoughtBudget from "./components/not-enough-budget";
import Schedule from "./components/schedule";
import Suspended from "./components/suspensed";

interface Props {
  status: EAdvertiseStatus;
  isEnoughBudget: boolean;
}

const InfoBanner = (props: Props) => {
  const { status, isEnoughBudget } = props;

  const renderContent = () => {
    switch (status) {
      case EAdvertiseStatus.SCHEDULE:
        return <Schedule />
      case EAdvertiseStatus.SUSPENDED:
        return (
          <div className="flex flex-col gap-2">
            <Suspended />
            <NotEnoughtBudget isEnoughBudget={isEnoughBudget} />
          </div>
        );
      default: return null;
    }
  }

  return renderContent();
}

export default memo(InfoBanner, isEqual)
