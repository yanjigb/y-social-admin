import getDayOfWeek from "./get-day-of-week";
import { IResult } from "../../../../../../../../../../../types/advertise";

interface IWeekDaysData {
  [key: string]: {
    date: any;
    ctr: number;
  };
}

interface IChartData {
  name: string
  date: any;
  ctr: number;
}

export const GroupByDayOfWeek = (data: IResult[]): IChartData[] => {
  const weekDaysData: IWeekDaysData = {
    Mon: { date: '', ctr: 0 },
    Tue: { date: '', ctr: 0 },
    Wed: { date: '', ctr: 0 },
    Thu: { date: '', ctr: 0 },
    Fri: { date: '', ctr: 0 },
    Sat: { date: '', ctr: 0 },
    Sun: { date: '', ctr: 0 },
  };

  data.forEach(item => {
    const day = getDayOfWeek(item.date);
    weekDaysData[day].date = item.date;
    weekDaysData[day].ctr = item.ctr;
  });

  const result = Object.keys(weekDaysData).map(day =>({
      name: day,
      ...weekDaysData[day],
    })
  ).sort((a, b) => {
    return new Date(a.date) > new Date(b.date) ? 1 : -1;
  });

  return result;
}
