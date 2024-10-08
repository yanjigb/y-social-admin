interface Column {
  id: "id" |
  "title" |
  "budget" |
  "currency" |
  "schedule_start" |
  "schedule_end" |
  "status" |
  "score" |
  "created_at" |
  "updated_at" |
  "actions";
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'title', label: 'Title', minWidth: 100 },
  {
    id: 'budget',
    label: 'Budget (per day)',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'currency',
    label: 'Currency',
    minWidth: 100,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'schedule_start',
    label: 'Schedule Start',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'schedule_end',
    label: 'Schedule End',
    minWidth: 200,
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'score',
    label: 'Score',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'created_at',
    label: 'Created At',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'updated_at',
    label: 'Updated At',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'actions',
    label: '',
    minWidth: 170,
    align: 'right',
  },
];
