import { memo, useState } from "react"
import isEqual from "react-fast-compare"
import { EAdvertiseStatus } from "../../../../../../../types/advertise";
import Skeleton from "./skeleton";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Update } from "../../../../../../../services/ads.service";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ROLE from "../../../../../../../constants/role";
import useCurrentUser from "../../../../../../../hooks/user-current-user";

interface Props {
  status: EAdvertiseStatus;
}

const Status = (props: Props) => {
  const { status } = props;
  const { id } = useParams()

  if (!status) return <Skeleton />

  const { user } = useCurrentUser();
  const [selectedStatus, setSelectedStatus] = useState(status);
  const handleChangeStatus = (e: any) => {
    setSelectedStatus(e.target.value);

    Update(id, { status: e.target.value }).then(res => {
      console.log(res)
      toast.success("Update Successfully")
    }).catch(() => {
      toast.error("Something went wrong")
    })
  }

  const isAllowRole = user?.role === ROLE.SUPER_ADMIN_PROFILE.id || user?.role === ROLE.STAFF_PROFILE.id;
  const filterStatus = isAllowRole ? Object.values(EAdvertiseStatus)
    .map((item) => (
      <MenuItem key={item} value={item}>{item}</MenuItem>
    )) : Object.values(EAdvertiseStatus)
      .filter((item) => item !== EAdvertiseStatus.SCHEDULE &&
        item !== EAdvertiseStatus.IN_REVIEW &&
        item !== EAdvertiseStatus.SUSPENDED
      )
      .map((item) => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      ))

  return (
    <FormControl className="w-max capitalize">
      <Select
        labelId="status-select-label"
        value={selectedStatus}
        onChange={handleChangeStatus}
      >
        {filterStatus}
      </Select>
    </FormControl>
  )
}

export default memo(Status, isEqual)
