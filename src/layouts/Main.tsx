import { useSession } from 'next-auth/react';

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
  const session = useSession();

  console.log('SESSION', session);

  return (
    <Container
      maxWidth={'xl'}
      component={'main'}
      {...rest}
      sx={{
        minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        pl: { lg: session.data ? 'calc(100vw - 80%)' : 0 },
        ...rest.sx,
      }}
    >
      {children}
      {session.data && showSidebar && <Sidebar />}
    </Container>
  );
};
