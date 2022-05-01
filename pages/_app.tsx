import type { NextPage, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { memo, ReactElement, ReactNode, useEffect } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { Notification } from 'components/Notification';
import { Header } from 'layouts/Header';
import { Main } from 'layouts/Main';
import { useStore } from 'lib/store';

import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import '@fontsource/roboto/latin-900.css';

export default memo(App);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session | null;
};

function App(props: AppPropsWithLayout) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  const retrieveUsers = useStore((state) => state.retrieveUsers);
  const retrieveStations = useStore((state) => state.retrieveStations);
  const error = useStore((state) => state.error);
  const setError = useStore((state) => state.setError);
  const success = useStore((state) => state.success);
  const setSuccess = useStore((state) => state.setSuccess);

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <Header />
        <Main>{page}</Main>
        {/* <Footer /> */}
      </>
    ));

  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => {
        setError('');
      }, 6000);

      return () => clearTimeout(timerId);
    }
  }, [error, setError]);

  useEffect(() => {
    if (success) {
      const timerId = setTimeout(() => {
        setSuccess('');
      }, 6000);

      return () => clearTimeout(timerId);
    }
  }, [success, setSuccess]);

  useEffect(() => {
    if (session && session.jwt) {
      console.log(session);

      const { jwt } = session;

      retrieveStations(jwt);
      retrieveUsers(jwt);
    }
  }, [session, retrieveStations, retrieveUsers]);

  return (
    <SessionProvider
      session={session}
      refetchInterval={0}
    >
      <ThemeProvider
        theme={createTheme({
          palette: { mode: 'dark' },
          breakpoints: { values: { xs: 0, sm: 600, md: 1024, lg: 1440, xl: 1920 } },
          spacing: 4,
        })}
      >
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
        <Notification
          open={!!error || !!success}
          handleClose={() => setError('')}
          text={error || success}
          status={error ? 'error' : 'success'}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
