import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export { ConfirmationDialog };

type ConfirmationDialogProps = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  text: string;
  title: string;
};

const ConfirmationDialog = ({
  title,
  open,
  onConfirm,
  onClose,
  text,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          onClick={onConfirm}
          autoFocus
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
