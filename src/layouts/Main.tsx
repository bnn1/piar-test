import { Session } from 'next-auth';
import { SessionContextValue, useSession } from 'next-auth/react';

import { ReactNode } from 'react';

import { Container, ContainerProps } from '@mui/material';

export { Main };

type MainProps = ContainerProps & {
  children: ReactNode;
};

const Main = ({ children, ...rest }: MainProps) => {
  return (
    <Container
      maxWidth={'lg'}
      component={'main'}
      {...rest}
      sx={{ minHeight: '100vh', ...rest.sx }}
    >
      {children}
    </Container>
  );
};
