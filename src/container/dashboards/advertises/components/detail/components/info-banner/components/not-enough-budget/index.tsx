import { Alert } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalStorageKeys from "../../../../../../../../../constants/local-storage-keys";
import checkAllowRole from "../../../../../../../../../lib/check-allow-role";
import ROLE from "../../../../../../../../../constants/role";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../../../../../../../constants/routes";
import { getDynamicRoute } from "../../../../../../../../../lib/get-dynamic-route";

interface Props {
  isEnoughBudget: boolean;
}

const role = localStorage.getItem(LocalStorageKeys.ROLE);
const isAllowRole = checkAllowRole(Number(role), [ROLE.ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id, ROLE.SUPER_ADMIN_PROFILE.id]);

export default function NotEnoughtBudget(props: Props) {
  const { isEnoughBudget } = props;

  return !isEnoughBudget &&
    <Alert icon={<AccountBalanceWalletIcon fontSize="inherit" />} severity="error">
      {
        isAllowRole ? "This user don't have enought balance to run this advertise" :
        <div className="flex items-center gap-2">
          <p>This user don't have enought balance to run this advertise.</p>
          <Link to={getDynamicRoute(RouteNames.PAYMENT)} className="text-primary font-bold hover:underline">
              Recharge now
          </Link>
        </div>
      }
    </Alert>
}
