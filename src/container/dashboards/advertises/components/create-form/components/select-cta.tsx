import { useState } from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { AdsCTAList } from "../../../../../../constants/ads-target";
import { Control, Controller } from "react-hook-form";
import { IAdvertiseForm } from "../schema";

interface Props {
  onChange: (value: string) => void;
  defaultValue?: string;
  control: Control<IAdvertiseForm, any>
}

export default function SelectCTA({ onChange, control }: Props) {
  const [selectedValue, setSelectedValue] = useState(AdsCTAList[0]);

  const handleChangeCTA = (event: SelectChangeEvent<string>) => {
    const selectedKey = event.target.value;
    setSelectedValue(selectedKey);
    onChange(selectedKey);
  };

  return (
    <Controller
      name="cta"
      defaultValue={selectedValue}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="flex flex-col gap-2 mb-3">
          <span className="text-base">Choose your CTA</span>
          <FormControl fullWidth>
            <Select
              value={selectedValue}
              onChange={handleChangeCTA}
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
