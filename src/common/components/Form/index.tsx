import { Children, createElement, HTMLAttributes, ReactElement, ReactNode } from 'react';
import {
  DefaultValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormReturn,
} from 'react-hook-form';

import { Stack, StackProps } from '@mui/material';

export { Form };

type FormProps<T> = Omit<StackProps, 'children'> &
  Omit<HTMLAttributes<HTMLFormElement>, 'children'> & {
    defaultValues?: DefaultValues<T>;
    onSubmit: SubmitHandler<T>;
    children: ReactElement | (({ register }: Pick<UseFormReturn<T>, 'register'>) => ReactNode);
  };

const Form = <T,>({ children, onSubmit, defaultValues, ...rest }: FormProps<T>) => {
  const { handleSubmit, register } = useForm({ defaultValues });

  return (
    <Stack
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      {typeof children === 'function'
        ? children({ register })
        : Children.map(children, (child: ReactElement) => {
            const { type, props } = child;

            return props?.name
              ? createElement(type, {
                  ...{
                    ...props,
                    ...register(props.name),
                    key: props.name,
                  },
                })
              : child;
          })}
    </Stack>
  );
};
