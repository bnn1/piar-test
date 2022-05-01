import { Session } from 'next-auth';
import { SessionContextValue, useSession } from 'next-auth/react';

import { ReactNode } from 'react';

import { Container, ContainerProps, useMediaQuery, useTheme } from '@mui/material';

import { Sidebar } from './Sidebar';

export { Main };

type MainProps = ContainerProps & {
  children: ReactNode;
};

const Main = ({ children, ...rest }: MainProps) => {
  const theme = useTheme();
  const showSidebar = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Container
      maxWidth={'lg'}
      component={'main'}
      {...rest}
      sx={{
        minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        pl: { lg: 'calc(100vw - 80%)' },
        ...rest.sx,
      }}
    >
      {children}
      {showSidebar && <Sidebar />}
    </Container>
  );
};
