import { Box, Modal as MuiModal, Stack, SxProps, Typography } from '@mui/material';

export { Modal };

const mapping = {
  id: 'ID',
  api_key: 'API ключ',
  comment: 'Комментарий',
  created_at: 'Создано',
  updated_at: 'Обновлено',
  login: 'Логин',
  name: 'Имя',
};

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  fields: { fieldTitle: keyof typeof mapping; fieldValue: string | number }[];
};

const defaultStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1,
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Modal = ({ open, handleClose, title, fields, ...rest }: ModalProps) => {
  console.log('FIELDS:', fields);

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        rowGap={4}
        sx={{ ...defaultStyle, ...rest }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {title}
        </Typography>
        <Stack>
          {fields.map(({ fieldTitle, fieldValue }) => (
            <Stack
              key={fieldTitle + fieldValue}
              direction={'row'}
              columnGap={3}
              justifyContent={'space-between'}
            >
              <Typography>{mapping[fieldTitle]}</Typography>
              <Typography>{fieldValue}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </MuiModal>
  );
};
