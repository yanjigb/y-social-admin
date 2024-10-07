interface Column {
  id: "id" |
  "user id" |
  "title" |
  "description" |
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
  { id: 'user id', label: 'User ID', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
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
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'schedule_start',
    label: 'Schedule Start',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'schedule_end',
    label: 'Schedule End',
    minWidth: 170,
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
