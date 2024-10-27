import { Alert } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function Schedule() {
  return (
    <Alert icon={<CalendarMonthIcon fontSize="inherit" />} severity="warning">Your advertise is in schedule</Alert>
  );
}
