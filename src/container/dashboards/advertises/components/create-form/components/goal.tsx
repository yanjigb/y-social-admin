import { Control, Controller } from "react-hook-form";
import { IAdvertiseForm } from "../schema";
import { AdsTargetList } from "../../../../../../constants/ads-target";
import GoalTarget from "./goal-target";

interface Props {
  control: Control<IAdvertiseForm, any>
}

export default function Goal(props: Props) {
  const { control } = props;

  return (
    <Controller
      name="goal"
      control={control}
      defaultValue={{ goalID: AdsTargetList[0].key }}
      render={({ field: { onChange } }) => (
        <GoalTarget
          onChange={(selectedTarget) => {
            onChange({ goalID: selectedTarget.key });
          }}
          defaultValue={AdsTargetList[0]}
        />
      )}
    />
  );
}
