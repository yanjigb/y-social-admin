import getDayOfWeek from "./get-day-of-week";
import { IResult } from "../../../../../../../../../../../types/advertise";

interface IWeekDaysData {
  [key: string]: {
    date: any;
    cpm: number;
    impressions: number;
  };
}

interface IChartData {
  name: string;
  date: any;
  cpm: number;
  impressions: number;
}

export const GroupByDayOfWeek = (data: IResult[]): IChartData[] => {
  const weekDaysData: IWeekDaysData = {
    Mon: { date: '', cpm: 0, impressions: 0 },
    Tue: { date: '', cpm: 0, impressions: 0 },
    Wed: { date: '', cpm: 0, impressions: 0 },
    Thu: { date: '', cpm: 0, impressions: 0 },
    Fri: { date: '', cpm: 0, impressions: 0 },
    Sat: { date: '', cpm: 0, impressions: 0 },
    Sun: { date: '', cpm: 0, impressions: 0 },
  };

  data.forEach(item => {
    const day = getDayOfWeek(item.date);
    weekDaysData[day].date = item.date;
    weekDaysData[day].cpm = item.cpm;
    weekDaysData[day].impressions = item.impressions;
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
