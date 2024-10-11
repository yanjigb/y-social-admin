import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { memo } from "react"
import isEqual from "react-fast-compare"
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import Skeleton from "./skeleton";

interface Props {
  goal: string;
}

const DetailGoal = (props: Props) => {
  const { goal } = props;

  if (!goal) return <Skeleton />

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography>Advertise Goal</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {goal}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(DetailGoal, isEqual)
