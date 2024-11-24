interface Column {
  id: 'date' | 'impressions' | 'clicks' | 'cpc' | 'cpm' | 'cost' | 'ctr';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: 'date', label: 'Latest Update', minWidth: 170 },
  { id: 'impressions', label: 'Impressions', minWidth: 100 },
  {
    id: 'clicks',
    label: 'Clicks',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'cpc',
    label: 'Cost Per Click ( CPC )',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'cpm',
    label: 'Cost Per Impression ( CPM )',
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
    label: 'Click Through Rate ( CTR )',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];
