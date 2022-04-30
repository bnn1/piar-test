import { FormControl, FormHelperText, FormLabel, Input as MuiInput } from '@mui/material';

import { FormInputProps } from '../types';

export { Input };

const Input = <T,>(props: FormInputProps<T>) => {
  const { register, name, options, error, label, ...rest } = props;

  return (
    <FormControl
      error={!!error}
      variant={'outlined'}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDir: 'column',
      }}
    >
      <FormLabel>{label}</FormLabel>
      <MuiInput
        // autoComplete="off"
        // focusBorderColor={error ? 'red.500' : 'blue.500'}
        inputProps={{ ...register(name, options) }}
        {...rest}
      />
      <FormHelperText
        sx={{
          mt: 0,
          position: 'absolute',
          bottom: -5,
          left: 0,
          fontSize: 'xs',
        }}
      >
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
};
