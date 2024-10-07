import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AdsTargetList } from "../../../../../../../constants/ads-target";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { IAdsTarget } from "../../../../../../../types/advertise";

interface Props {
  onChange: (value: IAdsTarget) => void;
  defaultValue?: IAdsTarget;
}

export default function GoalTarget({ onChange, defaultValue }: Props) {
  const [selectedValue, setSelectedValue] = useState<IAdsTarget>(defaultValue ?? AdsTargetList[0]);

  const handleChangeGoalTarget = (event: SelectChangeEvent<string>) => {
    const selectedKey = event.target.value;
    const selectedTarget = AdsTargetList.find(item => item.key === selectedKey);

    if (selectedTarget) {
      setSelectedValue(selectedTarget);
      onChange(selectedTarget);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="flex flex-col gap-2 mb-3">
      <span className="text-base">Choose your goal target</span>

      <FormControl fullWidth>
        <Select
          value={selectedValue.key} // Use the key for the Select value
          onChange={handleChangeGoalTarget}
        >
          {AdsTargetList.map((item) => (
            <MenuItem key={item.key} value={item.key}>{item.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedValue && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Your ads will be
          </AccordionSummary>
          <AccordionDetails>
            <ul className="flex flex-col gap-2 bg-gray-200 p-4 rounded-xl">
              {selectedValue.pros.map((item) => (
                <li key={item.title}>
                  <span className="text-base font-bold">- {item.title}: </span>
                  <span className="text-base">{item.description}</span>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}
