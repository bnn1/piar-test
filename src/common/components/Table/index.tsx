import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { ConfirmationDialog } from 'components/ConfirmationDialog';

import { TableProps } from './table.types';

export { Table };

const Table = ({ columns, rows, onDelete, slice = rows.length }: TableProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [userId, setUserId] = useState<number | string | null>(null);
  const selectUser = (id: number | string, cb: any) => {
    setUserId(id);
    cb();
  };

  const onConfirm = () => {
    onDelete(userId as number);
    setUserId(null);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MuiTable
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ maxWidth: 100, ...column.sx }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, slice).map((row) => {
              console.log('ROW:', row);

              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {columns.map((column) => {
                    if (column.id) {
                      const value = row[column.id as keyof typeof row];

                      if (column.id === 'actions') {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                          >
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => selectUser(row.id, () => setShowDialog(true))}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                        >
                          {value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <ConfirmationDialog
        title={'Удалить пользователя?'}
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={() => onDelete(userId as number)}
        text={`Вы уверены, что хотите удалить пользователя с ID: ${userId}?`}
      />
    </Paper>
  );
};
