import { Children, createElement, HTMLAttributes, ReactElement, ReactNode } from 'react';
import {
  DefaultValues,
  FieldError,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormReturn,
} from 'react-hook-form';

import { Stack, StackProps } from '@mui/material';

import { InputProps } from './components/Input';

export { Form };

type FormProps<T> = Omit<StackProps, 'children'> &
  Omit<HTMLAttributes<HTMLFormElement>, 'children'> & {
    defaultValues?: DefaultValues<T>;
    onSubmit: SubmitHandler<T>;
    children:
      | ReactElement<InputProps<T> | any>[]
      | (({ register }: Pick<UseFormReturn<T>, 'register'>) => ReactNode);
  };

const Form = <T,>({ children, onSubmit, defaultValues, ...rest }: FormProps<T>) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <Stack
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      {typeof children === 'function'
        ? children({ register })
        : Children.map(children, (child: ReactElement<InputProps<T>>) => {
            const { type, props } = child;

            return props?.name
              ? createElement(type, {
                  ...{
                    ...props,
                    register,
                    error: errors[props.name],
                    key: props.name,
                  },
                })
              : child;
          })}
    </Stack>
  );
};
