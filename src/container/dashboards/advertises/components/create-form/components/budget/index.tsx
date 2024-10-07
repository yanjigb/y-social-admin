import { Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";
import SimpleSlider from "../../../../../../../components/ui/simpleslider";
import { currencyFormat } from "../../../../../../../lib/currency-format";

interface Props {
  budget: number;
  control: Control<IAdvertiseForm, any>
  onChangeBudget: (id: string) => (value: number | number[]) => void;
}

const marks = {
  50000: `${currencyFormat(Number(50000))} VND`,
  3000000: `${currencyFormat(Number(3000000))} VND`,
};

export default function Budget(props: Props) {
  const { budget, onChangeBudget, control } = props;

  return <div className="flex flex-col items-center gap-6">
    <Typography color="blue" fontSize="4rem" className="font-semibold">{currencyFormat(Number(budget))} VND / day</Typography>

    <Controller
      name="budget"
      defaultValue={budget}
      control={control}
      render={({ field: { onChange } }) => (
        <SimpleSlider
          style={{
            padding: "0 2.5rem"
          }}
          sliderProps={
            {
              min: 50000,
              max: 3000000,
              step: 10000,
              defaultValue: budget,
              // value: budget,
              trackStyle: {
                background: "blue"
              },
              onChange: (newValue) => {
                onChangeBudget("budget")(newValue);
                onChange(newValue);
              }
            }
          }
          markList={marks}
        />
      )} />
  </div>;
}
