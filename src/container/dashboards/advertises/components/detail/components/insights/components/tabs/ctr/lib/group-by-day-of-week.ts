import getDayOfWeek from "./get-day-of-week";
import { IResult } from "../../../../../../../../../../../types/advertise";

interface IWeekDaysData {
  [key: string]: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    date: any;
    ctr: number;
  };
}

interface IChartData {
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  date: any;
  ctr: number;
}

export const GroupByDayOfWeek = (data: IResult[]): IChartData[] => {
  const weekDaysData: IWeekDaysData = {
    Mon: { impressions: 0, clicks: 0, conversions: 0, cost: 0, ctr: 0, date: '' },
    Tue: { impressions: 0, clicks: 0, conversions: 0, cost: 0, ctr: 0, date: '' },
    Wed: { impressions: 0, clicks: 0, conversions: 0, cost: 0, ctr: 0, date: '' },
    Thu: { impressions: 0, clicks: 0, conversions: 0, cost: 0, ctr: 0, date: '' },
    Fri: { impressions: 0, clicks: 0, conversions: 0, cost: 0, ctr: 0, date: '' },
    Sat: { impressions: 0, clicks: 0, conversions: 0, cost: 0, ctr: 0, date: '' },
    Sun: { impressions: 0, clicks: 0, conversions: 0, cost: 0, ctr: 0, date: '' },
  };

  data.forEach(item => {
    const day = getDayOfWeek(item.date);
    weekDaysData[day].impressions += item.impressions;
    weekDaysData[day].clicks += item.clicks;
    weekDaysData[day].conversions += item.conversions;
    weekDaysData[day].cost += item.cost;
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
