import { Alert, AlertColor, Snackbar } from '@mui/material';

export { Notification };

type NotificationProps = {
  open: boolean;
  handleClose: () => void;
  text: string;
  closeAfter?: number;
  type?: AlertColor;
};

const Notification = ({
  text,
  open,
  handleClose,
  type,
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
        severity={type || 'success'}
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
