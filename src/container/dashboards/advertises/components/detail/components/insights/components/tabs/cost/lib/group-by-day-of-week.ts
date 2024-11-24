import getDayOfWeek from "./get-day-of-week";
import { IResult } from "../../../../../../../../../../../types/advertise";

interface IWeekDaysData {
  [key: string]: {
    cost: number;
    date: any;
  };
}

interface IChartData {
  name: string;
  cost: number;
  date: any;
}

export const GroupByDayOfWeek = (data: IResult[]): IChartData[] => {
  const weekDaysData: IWeekDaysData = {
    Mon: { cost: 0, date: '' },
    Tue: { cost: 0, date: '' },
    Wed: { cost: 0, date: '' },
    Thu: { cost: 0, date: '' },
    Fri: { cost: 0, date: '' },
    Sat: { cost: 0, date: '' },
    Sun: { cost: 0, date: '' },
  };

  data.forEach(item => {
    const day = getDayOfWeek(item.date);
    weekDaysData[day].cost += item.cost;
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
