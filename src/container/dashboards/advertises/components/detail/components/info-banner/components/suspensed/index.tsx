import { Alert } from "@mui/material"
import LocalStorageKeys from "../../../../../../../../../constants/local-storage-keys";
import checkAllowRole from "../../../../../../../../../lib/check-allow-role";
import ROLE from "../../../../../../../../../constants/role";

const role = localStorage.getItem(LocalStorageKeys.ROLE);
const isAllowRole = checkAllowRole(Number(role), [ROLE.ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id, ROLE.SUPER_ADMIN_PROFILE.id]);

export default function Suspended() {
  return (
    <Alert severity="error">
      {
        isAllowRole ? "This user's advertise is suspended" :
          "Your advertise is suspended"
      }
    </Alert>
  )
}
