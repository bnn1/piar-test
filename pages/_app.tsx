import type { NextPage, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { memo, ReactElement, ReactNode, useEffect } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

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
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' }, spacing: 4 })}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SessionProvider>
  );
}
