interface Data {
  date: string;
  impressions: string;
  clicks: number;
  conversions: number;
  ctr: number;
  cost: number;
}

export default function MockData(
  date: string,
  impressions: string,
  clicks: number,
  conversions: number,
  ctr: number,
  cost: number
): Data {
  return { date, impressions, clicks, conversions, ctr, cost };
}
