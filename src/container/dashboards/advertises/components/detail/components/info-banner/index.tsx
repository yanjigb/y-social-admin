import { memo } from "react"
import isEqual from "react-fast-compare"
import { EAdvertiseStatus } from "../../../../../../../types/advertise"
import { Alert } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface Props {
  status: EAdvertiseStatus;
  isEnoughBudget: boolean;
}

const InfoBanner = (props: Props) => {
  const { status, isEnoughBudget } = props;

  const renderContent = () => {
    switch (status) {
      case EAdvertiseStatus.SCHEDULE:
        return <Alert icon={<CalendarMonthIcon fontSize="inherit" />} severity="warning">Your advertise is in schedule</Alert>;
      case EAdvertiseStatus.SUSPENDED:
        return (
          <div className="flex flex-col gap-2">
            <Alert severity="error">Your advertise is suspended</Alert>

            {
              !isEnoughBudget &&
              <Alert icon={<AccountBalanceWalletIcon fontSize="inherit" />} severity="error">Your balance is not enough</Alert>
            }
          </div>
        );
      default: return null;
    }
  }

  return renderContent();
}

export default memo(InfoBanner, isEqual)
