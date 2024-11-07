
interface Column {
  id: "id" |
  "userID" |
  "amount" |
  "description" |
  "created_at" |
  "actions";
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'userID', label: 'User ID', minWidth: 100 },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'created_at',
    label: 'Created At',
    minWidth: 200,
    align: 'left',
  },
];
