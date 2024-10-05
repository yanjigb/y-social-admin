import { Control, Controller, FieldErrors, UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { calculateDateDifferenceInDays } from "../../../../../../lib/calculate-date-differen-in-days";
import { IAdvertiseForm } from '../schema';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { toast } from 'sonner';

interface Props {
  control: Control<IAdvertiseForm, any>;
  errors: FieldErrors<IAdvertiseForm>;
  watch: UseFormWatch<IAdvertiseForm>;
  getValues: UseFormGetValues<IAdvertiseForm>;
}

function disableDateBeforeNow(date: any) {
  return date.isBefore(dayjs(), 'day');
}

const defaultDate = dayjs(new Date());

export default function Schedule({ getValues, control, watch }: Props) {
  const startDate1 = new Date(watch("schedule_start"));
  const endDate = new Date(watch("schedule_end")!);

  if (endDate < startDate1) {
    toast.error("Invalid end date");
  }

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
            rules={{
              required: {
                value: true,
                message: "Start date is required",
              },
            }}
            render={({ field: { onChange } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                format="DD-MM-YYYY"
                views={['day', 'month', 'year']}
                label="Choose your start date"
                shouldDisableDate={disableDateBeforeNow}
                defaultValue={defaultDate}
                onChange={(date) => {
                  const dayjsDate = dayjs(date);
                  onChange(dayjsDate.toDate());
                }} />
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
            render={({ field: { onChange } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format="DD-MM-YYYY" views={['day', 'month', 'year']} label="Choose your end date" shouldDisableDate={disableDateBeforeNow} defaultValue={defaultDate} onChange={(date) => {
                  const dayjsDate = dayjs(date);
                  onChange(dayjsDate.toDate());
                }} />
              </LocalizationProvider>
            )}
          />
        </div>
      </div>

      <div className="text-lg flex gap-2">
        <span>Your ads will run in:</span>
        <div className="font-bold flex bg-red-500 gap-2">
          <span>{calculateDateDifferenceInDays(getValues("schedule_start"), getValues("schedule_end")!)}</span>
          <span>days</span>
        </div>
      </div>
    </div>
  );
}
