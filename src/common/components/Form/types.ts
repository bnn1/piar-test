import { FieldError, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { InputProps, SelectProps } from '@mui/material';

export type FormComponentProps<T, I> = I & {
  name: Path<T>;
  register?: UseFormRegister<T>;
  label: string;
  error?: FieldError;
  options?: RegisterOptions<T>;
};

export type FormSelectProps<T> = FormComponentProps<T, SelectProps>;
export type FormInputProps<T> = FormComponentProps<T, InputProps>;
