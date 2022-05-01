import { Alert, AlertColor, Snackbar } from '@mui/material';

export { Notification };

type NotificationProps = {
  open: boolean;
  handleClose: () => void;
  text: string;
  closeAfter?: number;
  status?: AlertColor;
};

const Notification = ({
  text,
  open,
  handleClose,
  status,
  closeAfter = 6000,
}: NotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={closeAfter}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={status || 'success'}
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
