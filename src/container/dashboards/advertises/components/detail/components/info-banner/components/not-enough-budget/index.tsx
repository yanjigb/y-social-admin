import { Alert } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalStorageKeys from "../../../../../../../../../constants/local-storage-keys";
import checkAllowRole from "../../../../../../../../../lib/check-allow-role";
import ROLE from "../../../../../../../../../constants/role";

interface Props {
  isEnoughBudget: boolean;
}

const role = localStorage.getItem(LocalStorageKeys.ROLE);
const isAllowRole = checkAllowRole(Number(role), [ROLE.ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id, ROLE.SUPER_ADMIN_PROFILE.id]);

export default function NotEnoughtBudget(props: Props) {
  const { isEnoughBudget } = props;
  console.log(isAllowRole ? 123 : 444);

  return !isEnoughBudget &&
    <Alert icon={<AccountBalanceWalletIcon fontSize="inherit" />} severity="error">Your balance is not enough</Alert>
}
