import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { CreateStation, CreateUser, EditableFields, Station, User } from 'common/types/users';
import { ConfirmationDialog } from 'components/ConfirmationDialog';
import { Dialog } from 'components/Dialog';
import { Input } from 'components/Form/components/Input';
import { Modal } from 'components/Modal';
import { useEditableFields } from 'hooks/useEditableFields';

import { TableProps } from './table.types';

export { Table };

const Table = (props: TableProps) => {
  const { columns, rows, tableName, onDelete, onEdit, slice = rows.length } = props;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetails, setShowDetails] = useState<{
    open: boolean;
    item: null | User | Station;
  }>({ open: false, item: null });
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    id: number | null;
    item: CreateUser | CreateStation | null;
  }>({
    name: '',
    id: null,
    item: null,
  });

  const editableFields = useEditableFields(tableName === 'Пользователи' ? 'user' : 'station');

  const selectUser = (item: typeof selectedItem, cb: any) => {
    setSelectedItem(item);
    cb();
  };

  const handleShowDetails = (item: User | Station) => {
    console.log('DETAILS:', item);
    setShowDetails({ open: true, item });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: { xs: 440, lg: 'unset' } }}>
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
                            <Button onClick={() => handleShowDetails(row)}>Подробнее</Button>
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
      <Dialog
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
          Object.keys(data).length && selectedItem.id && onEdit(selectedItem.id, data);
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
      </Dialog>
      {showDetails.open && showDetails.item && (
        <Modal
          title={`Подробности о ${showDetails.item.name}`}
          open={showDetails.open}
          handleClose={() => setShowDetails({ open: false, item: null })}
          fields={Object.entries(showDetails.item).map(([key, val]) => ({
            fieldTitle: key as any,
            fieldValue: val as any,
          }))}
        />
      )}
    </Paper>
  );
};
