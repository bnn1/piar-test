import { TableCellProps } from '@mui/material';

export type { TableColumn, TableProps, TableRow };

type TableColumn = {
  id: 'id' | 'name' | 'login' | 'actions' | string;
  label: string;
  align?: TableCellProps['align'];
  sx?: TableCellProps['sx'];
};

type TableRow = {
  [K in TableColumn['id']]: string | number;
};

type TableProps = {
  columns: TableColumn[];
  rows: TableRow[];
  onDelete: (id: number) => void;
  slice?: number;
};
