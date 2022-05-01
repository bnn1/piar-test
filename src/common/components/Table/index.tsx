import { MouseEvent, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as MuiTableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { CreateStation, CreateUser, Station, User } from 'common/types/users';
import { ConfirmationDialog } from 'components/ConfirmationDialog';
import { Dialog } from 'components/Dialog';
import { Input } from 'components/Form/components/Input';
import { Modal } from 'components/Modal';
import { useEditableFields } from 'hooks/useEditableFields';

import { TableProps, TableRow } from './table.types';

export { Table };

const Table = (props: TableProps) => {
  const { columns, rows, tableName, onDelete, onEdit, slice = rows.length } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
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

  const theme = useTheme();
  const expandedActions = useMediaQuery(theme.breakpoints.up('md'));
  const editableFields = useEditableFields(tableName === 'Пользователи' ? 'user' : 'station');

  const resetSelectedItem = () => {
    setShowEditDialog(false);
    setShowDeleteDialog(false);
    setShowDetails({ open: false, item: null });
    setSelectedItem({ name: '', id: null, item: null });
  };

  const handleExpandActions = (event: MouseEvent<HTMLElement>, row: TableRow) => {
    setSelectedItem({
      id: Number(row.id),
      name: tableName === 'Пользователи' ? 'пользователя' : 'станцию',
      item: row,
    });
    setAnchorEl(event.currentTarget);
  };

  const handleCollapseActions = () => {
    setAnchorEl(null);
  };

  const handleShowDetails = (item: User | Station) => {
    setShowDetails({ open: true, item });
  };

  const handleIconClick = (row: TableRow, action: 'details' | 'edit' | 'delete') => {
    handleCollapseActions();

    switch (action) {
      case 'details': {
        handleShowDetails(row);
        break;
      }

      case 'edit': {
        setShowEditDialog(true);
        break;
      }

      case 'delete': {
        setShowDeleteDialog(true);
        break;
      }
    }

    if (!selectedItem.item) {
      setSelectedItem({
        id: Number(row.id),
        name: tableName === 'Пользователи' ? 'пользователя' : 'станцию',
        item: row,
      });
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <MuiTable
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <MuiTableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ maxWidth: 100, verticalAlign: 'bottom', px: 0, ...column.sx }}
                >
                  {column.label}
                </TableCell>
              ))}
            </MuiTableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, slice).map((row) => {
              return (
                <MuiTableRow
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
                            {expandedActions ? (
                              [
                                { label: 'Подробнее', action: 'details' as const },
                                { icon: <EditIcon />, action: 'edit' as const },
                                {
                                  icon: <DeleteIcon />,
                                  action: 'delete' as const,
                                },
                              ].map(({ label, icon, action }, idx) =>
                                label ? (
                                  <Button onClick={() => handleIconClick(row, action)}>
                                    {label}
                                  </Button>
                                ) : (
                                  <IconButton
                                    key={idx}
                                    onClick={() => handleIconClick(row, action)}
                                  >
                                    {icon}
                                  </IconButton>
                                )
                              )
                            ) : (
                              <>
                                <IconButton onClick={(e) => handleExpandActions(e, row)}>
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="menu-appbar"
                                  keepMounted
                                  anchorEl={anchorEl}
                                  open={!!anchorEl}
                                  onClose={handleCollapseActions}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                  }}
                                >
                                  {[
                                    {
                                      label: 'Подробнее',
                                      action: 'details' as const,
                                    },
                                    {
                                      label: 'Редактировать',
                                      action: 'edit' as const,
                                    },
                                    {
                                      label: 'Удалить',
                                      action: 'delete' as const,
                                    },
                                  ].map(({ label, action }) => (
                                    <MenuItem
                                      key={label + action}
                                      onClick={() => handleIconClick(row, action)}
                                    >
                                      {label}
                                    </MenuItem>
                                  ))}
                                </Menu>
                              </>
                            )}
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
                </MuiTableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <ConfirmationDialog
        title={`Удалить ${selectedItem.name}?`}
        open={showDeleteDialog}
        onClose={() => resetSelectedItem()}
        onConfirm={() => {
          resetSelectedItem();
          selectedItem.id && onDelete(selectedItem.id);
        }}
        text={`Вы уверены, что хотите удалить ${selectedItem.name} с ID: ${selectedItem.id}?`}
      />
      <Dialog
        title={`Редактировать ${selectedItem.name}`}
        open={showEditDialog}
        onClose={() => resetSelectedItem()}
        handleSubmit={(data) => {
          resetSelectedItem();
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
