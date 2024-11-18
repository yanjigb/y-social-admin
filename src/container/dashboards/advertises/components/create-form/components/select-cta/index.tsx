import { useState } from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { AdsCTAList } from "../../../../../../../constants/ads-target";
import { Control, Controller } from "react-hook-form";
import { IAdvertiseForm } from "../../schema";

interface Props {
  defaultValue?: string;
  control: Control<IAdvertiseForm, any>
}

export default function SelectCTA({ control }: Props) {
  const [selectedValue, setSelectedValue] = useState(AdsCTAList[0]);

  const handleChangeCTA = (event: SelectChangeEvent<string>) => {
    const selectedKey = event.target.value;
    setSelectedValue(selectedKey);
  };

  return (
    <Controller
      name="cta"
      defaultValue={selectedValue}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="flex flex-col gap-2 mb-3 flex-1">
          <span className="text-base">Choose your CTA</span>
          <FormControl fullWidth>
            <Select
              value={selectedValue}
              onChange={(e) => {
                onChange(e.target.value);
                handleChangeCTA(e);
              }}
            >
              {AdsCTAList.map((cta) => (
                <MenuItem key={cta} value={cta}>{cta}</MenuItem>
              ))}
              {selectedValue}
            </Select>
          </FormControl>
        </div>
      )}
    />
  );
}
