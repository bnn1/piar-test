import { ReactElement, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { Form } from 'components/Form';
import { InputProps } from 'components/Form/components/Input';

export { EditDialog };

type EditDialogProps<T> = {
  title: string;
  text?: string;
  children: any;
  open: boolean;
  onClose: () => void;
  handleSubmit: (data: any) => void;
};

const EditDialog = <T,>(props: EditDialogProps<T>) => {
  const [loading, setLoading] = useState(false);
  const { title, text, children, open, onClose, handleSubmit } = props;

  const onSubmit = (data: any) => {
    handleSubmit(data);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          display: 'flex',
          direction: 'column',
          rowGap: 5,
          p: 5,
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize={24}>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        <Form
          onSubmit={onSubmit}
          rowGap={2}
        >
          {children}
          <DialogActions>
            <Button onClick={onClose}>Отмена</Button>
            <LoadingButton
              variant={'contained'}
              color={'primary'}
              type={'submit'}
              loading={loading}
              loadingIndicator={'Сохраняем...'}
            >
              Сохранить
            </LoadingButton>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
