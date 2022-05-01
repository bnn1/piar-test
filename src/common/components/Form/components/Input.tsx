import { forwardRef } from 'react';
import {
  DeepMap,
  DeepPartial,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';

export { Input };

export type InputProps<T> = TextFieldProps['InputProps'] &
  Omit<TextFieldProps, 'InputProps'> & {
    name: Path<T> & keyof DeepMap<DeepPartial<T>, FieldError>;
    error?: FieldError;
    options?: RegisterOptions<T>;
    register?: UseFormRegister<T>;
  };

const Input = <T,>(props: InputProps<T>) => {
  const {
    label,
    required,
    select,
    children,
    error,
    register,
    name,
    multiline,
    options,
    ...rest
  } = props;

  if (name)
    return (
      <TextField
        required={required}
        select={select}
        name={name}
        multiline={multiline}
        InputProps={{ ...rest, ...register?.(name, options), notched: false }}
        label={label}
        error={!!error}
        helperText={error?.message}
        FormHelperTextProps={{ sx: { position: 'absolute', bottom: -20 } }}
        InputLabelProps={{
          shrink: true,
          variant: 'standard',
          sx: {
            position: 'relative',
            fontSize: { xs: 18 },
            color: 'text.primary',
            transform: 'none',
            '& > .MuiInputLabel-asterisk': {
              color: 'primary.main',
            },
          },
        }}
        variant={'outlined'}
        sx={{ rowGap: { xs: 2.5, sm: 3, md: 4, container: 5 } }}
      >
        {children}
      </TextField>
    );

  return null;
};

// import { FormControl, FormHelperText, FormLabel, Input as MuiInput } from '@mui/material';

// import { FormInputProps } from '../types';

// export { Input };

// const Input = <T,>(props: FormInputProps<T>) => {
//   const { register, name, options, error, label, ...rest } = props;

//   return (
//     <FormControl
//       error={!!error}
//       variant={'outlined'}
//       sx={{
//         position: 'relative',
//         display: 'flex',
//         flexDir: 'column',
//       }}
//     >
//       <FormLabel>{label}</FormLabel>
//       <MuiInput
//         // autoComplete="off"
//         // focusBorderColor={error ? 'red.500' : 'blue.500'}
//         inputProps={{ ...register(name, options) }}
//         {...rest}
//       />
//       <FormHelperText
//         sx={{
//           mt: 0,
//           position: 'absolute',
//           bottom: -5,
//           left: 0,
//           fontSize: 'xs',
//         }}
//       >
//         {error?.message}
//       </FormHelperText>
//     </FormControl>
//   );
// };
