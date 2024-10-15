import { memo } from "react"
import isEqual from "react-fast-compare"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Update } from "../../../../../../../services/ads.service";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Skeleton from "./skeleton";

interface Props {
  schedule_start: Date
  schedule_end: Date
}

const Schedule = (props: Props) => {
  const { schedule_start, schedule_end } = props
  const { id } = useParams();

  if (!schedule_end || !schedule_start) return <Skeleton />

  const handleChangeDate = (key: string, value: any) => {
    const formData = {
      [key]: value
    }

    Update(id, formData).then((res: any) => {
      toast.success("Update success")
      console.log(res)
    }).catch(() => toast.error("Something went wrong"))
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="box">
        <div className="box-body flex flex-col gap-3">
          <h6>Start date</h6>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              readOnly
              format="DD-MM-YYYY"
              views={['day', 'month', 'year']}
              value={dayjs(schedule_start)}
              onChange={() => {
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="box">
        <div className="box-body flex flex-col gap-3">
          <h6>End date</h6>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD-MM-YYYY"
              views={['day', 'month', 'year']}
              value={dayjs(schedule_end)}
              shouldDisableDate={(date) => date.isBefore(schedule_start)}
              onChange={(newValue) => {
                if (newValue) {
                  handleChangeDate("schedule_end", newValue.toDate());
                }
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  )
}

export default memo(Schedule, isEqual)
