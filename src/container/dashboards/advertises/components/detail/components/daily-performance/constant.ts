interface Column {
  id: 'date' | 'impressions' | 'clicks' | 'conversions' | 'cost' | 'ctr';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'impressions', label: 'Impressions', minWidth: 100 },
  {
    id: 'clicks',
    label: 'Clicks',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'conversions',
    label: 'Conversions',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'cost',
    label: 'Cost',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'ctr',
    label: 'CTR',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];
