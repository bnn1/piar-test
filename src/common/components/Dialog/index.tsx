import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

import { Form } from 'components/Form';

export { Dialog };

type DialogProps = {
  title: string;
  text?: string;
  children: any;
  open: boolean;
  onClose: () => void;
  handleSubmit: (data: any) => void;
};

const Dialog = (props: DialogProps) => {
  const { title, text, children, open, onClose, handleSubmit } = props;

  const onSubmit = (data: any) => {
    handleSubmit(data);
  };

  return (
    <MuiDialog
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
        {children && (
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
              >
                Сохранить
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </DialogContent>
    </MuiDialog>
  );
};
