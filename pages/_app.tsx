import type { NextPage, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { memo, ReactElement, ReactNode, useEffect } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { Main } from 'layouts/Main';

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

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        {/* <Header /> */}
        <Main>{page}</Main>
        {/* <Footer /> */}
      </>
    ));

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' }, spacing: 4 })}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SessionProvider>
  );
}
