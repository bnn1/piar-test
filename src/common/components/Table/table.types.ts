import { TableCellProps } from '@mui/material';

import { Station, UpdateStation, UpdateUser, User } from 'common/types/users';

export type { TableColumn, TableProps, TableRow };

type TableColumn = {
  id: 'id' | 'name' | 'login' | 'actions' | string;
  label: string;
  align?: TableCellProps['align'];
  sx?: TableCellProps['sx'];
};

type TableRow = {
  [K in TableColumn['id']]: string | number;
} & (User | Station);

type TableProps = {
  tableName: 'Пользователи' | 'Станции';
  columns: TableColumn[];
  rows: TableRow[];
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedItem: UpdateStation | UpdateUser) => void;
  slice?: number;
};
