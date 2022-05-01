import { useEffect, useState } from 'react';

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

import { CreateStation, CreateUser, EditableFields, Station, User } from 'common/types/users';
import { ConfirmationDialog } from 'components/ConfirmationDialog';
import { EditDialog } from 'components/EditDialog';
import { Input } from 'components/Form/components/Input';

import { TableProps } from './table.types';

export { Table };

type EditFields = {
  name: EditableFields;
  label: string;
  props?: { multiline?: boolean };
};

const Table = (props: TableProps) => {
  const { columns, rows, tableName, onDelete, onEdit, slice = rows.length } = props;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editableFields, setEditableFields] = useState<EditFields[]>([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    id: number | null;
    item: CreateUser | CreateStation | null;
  }>({
    name: '',
    id: null,
    item: null,
  });
  const selectUser = (item: typeof selectedItem, cb: any) => {
    setSelectedItem(item);
    cb();
  };

  useEffect(() => {
    if (tableName === 'Пользователи') {
      setEditableFields([
        { name: 'name', label: 'Имя' },
        { name: 'login', label: 'Логин' },
        { name: 'password', label: 'Пароль' },
        { name: 'comment', label: 'Комментарий', props: { multiline: true } },
      ]);
    }
    if (tableName === 'Станции') {
      setEditableFields([
        { name: 'name', label: 'Имя' },
        { name: 'comment', label: 'Комментарий', props: { multiline: true } },
      ]);
    }
  }, [tableName]);

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
                  sx={{ maxWidth: 100, verticalAlign: 'bottom', px: 0, ...column.sx }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, slice).map((row) => {
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
                            {[...new Array(2)].map((_, idx) => (
                              <IconButton
                                key={idx}
                                onClick={() =>
                                  selectUser(
                                    {
                                      id: Number(row.id),
                                      name:
                                        tableName === 'Пользователи'
                                          ? 'пользователя'
                                          : 'станцию',
                                      item: row,
                                    },
                                    () =>
                                      idx % 2 === 0
                                        ? setShowEditDialog(true)
                                        : setShowDeleteDialog(true)
                                  )
                                }
                              >
                                {idx % 2 === 0 ? <EditIcon /> : <DeleteIcon />}
                              </IconButton>
                            ))}
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
        title={`Удалить ${selectedItem.name}?`}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          setShowDeleteDialog(false);
          selectedItem.id && onDelete(selectedItem.id);
        }}
        text={`Вы уверены, что хотите удалить ${selectedItem.name} с ID: ${selectedItem.id}?`}
      />
      <EditDialog
        title={`Редактировать ${selectedItem.name}`}
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        handleSubmit={(data) => {
          setShowEditDialog(false);
          for (const key in data) {
            // @ts-ignore
            if (!data[key] || data[key] === selectedItem.item[key]) {
              delete data[key];
            }
          }
          selectedItem.id && onEdit(selectedItem.id, data);
        }}
      >
        {editableFields.map(({ label, props, name }) => (
          <Input
            label={label}
            key={name}
            name={name}
            // @ts-ignore
            defaultValue={selectedItem.item?.[name]}
            {...props}
          />
        ))}
      </EditDialog>
    </Paper>
  );
};
