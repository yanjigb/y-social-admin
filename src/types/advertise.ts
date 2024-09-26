import { IBase } from "./base";
import { CURRENCY } from "../constants/currency";

type TCurrency = keyof typeof CURRENCY;

export interface IDailyAdAnalytics {
  date: Date;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
}

export interface IGoal {
  adID: string;
  goalID: string;
}

export interface ITargetAudience {
  adID: string;
  ageRange?: string;
  gender?: string;
  location?: string;
  interest?: string;
}

export interface IAdvertise extends IBase {
  userID: string;
  title: string;
  description: string;
  media_content?: string;
  budget: number;
  currency: TCurrency;
  schedule_start: Date;
  schedule_end?: Date;
  cta: string;
  status: boolean;
  goal: IGoal;
  adTargetAudience?: ITargetAudience;
  result: IDailyAdAnalytics[];
  score: number;
}
