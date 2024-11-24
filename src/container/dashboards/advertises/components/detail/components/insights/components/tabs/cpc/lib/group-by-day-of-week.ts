import getDayOfWeek from "./get-day-of-week";
import { IResult } from "../../../../../../../../../../../types/advertise";

interface IWeekDaysData {
  [key: string]: {
    cpc: number;
    date: any;
  };
}

interface IChartData {
  name: string;
  date: any;
  cpc: number;
}

export const GroupByDayOfWeek = (data: IResult[]): IChartData[] => {
  const weekDaysData: IWeekDaysData = {
    Mon: { cpc: 0, date: '' },
    Tue: { cpc: 0, date: '' },
    Wed: { cpc: 0, date: '' },
    Thu: { cpc: 0, date: '' },
    Fri: { cpc: 0, date: '' },
    Sat: { cpc: 0, date: '' },
    Sun: { cpc: 0, date: '' },
  };

  data.forEach(item => {
    const day = getDayOfWeek(item.date);
    weekDaysData[day].cpc = item.cpc;
    weekDaysData[day].date = item.date;
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
