import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { calculateDateDifferenceInDays } from "../../../../../../lib/calculate-date-differen-in-days";
import { IAdvertiseForm } from '../schema';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

interface Props {
  schedule_start: Date;
  schedule_end: Date;
  control: Control<IAdvertiseForm, any>
  errors: FieldErrors<IAdvertiseForm>
}

function disableDateBeforeNow(date: any) {
  return date.isBefore(dayjs(), 'day');
}

export default function Schedule({ schedule_start, schedule_end, control }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className='flex flex-col gap-2 flex-1'>
          <label htmlFor="ads-media" aria-labelledby="ads media label" className="text-base">
            Schedule Start Date
          </label>

          <Controller
            name="schedule_start"
            control={control}
            defaultValue={new Date()}
            render={() => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Choose your start date" shouldDisableDate={disableDateBeforeNow} />
              </LocalizationProvider>
            )}
          />
        </div>

        <div className='flex flex-col gap-2 flex-1'>
          <label htmlFor="ads-media" aria-labelledby="ads media label" className="text-base">
            Schedule End Date
          </label>

          <Controller
            name="schedule_end"
            control={control}
            defaultValue={new Date()}
            render={() => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Choose your end date" shouldDisableDate={disableDateBeforeNow} />
              </LocalizationProvider>
            )}
          />
        </div>
      </div>

      <div className="text-lg flex gap-2">
        <span>Your ads will run in:</span>
        <div className="font-bold flex bg-red-500 gap-2">
          <span>{calculateDateDifferenceInDays(schedule_start, schedule_end)}</span>
          <span>days</span>
        </div>
      </div>
    </div>
  );
}
