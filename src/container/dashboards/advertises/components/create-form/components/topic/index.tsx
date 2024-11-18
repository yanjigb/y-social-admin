import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";
import { FormControl, Icon, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { HobbiesList } from "../../../../../../../constants/hobbies";

interface Props {
  errors: FieldErrors<IAdvertiseForm>;
  control: Control<IAdvertiseForm, any>;
}

const Topic = ({ errors, control }: Props) => {
  const [selectedValue, setSelectedValue] = useState(HobbiesList[0].value);

  const handleChangeCTA = (event: SelectChangeEvent<string>) => {
    const { value } = HobbiesList.find((hobby) => hobby.value === event.target.value) || HobbiesList[0];
    setSelectedValue(value);
  };

  return <Controller
    name="topic"
    defaultValue={selectedValue}
    control={control}
    render={({ field: { onChange } }) => (
      <div className="flex flex-col gap-2 mb-3 flex-1">
        <span className="text-base">Choose your topic</span>
        <FormControl fullWidth>
          <Select
            value={selectedValue}
            onChange={(e) => {
              onChange(e.target.value);
              handleChangeCTA(e);
            }}
          >
            {HobbiesList.map((hobby) => (
              <MenuItem key={hobby.value} value={hobby.value}>
                <div className="flex items-center gap-2">
                  <Icon component={hobby.icon} />
                  <span>{hobby.label}</span>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )}
  />;
};

export default memo(Topic, isEqual);
