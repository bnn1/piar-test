import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

import { ReactElement, useEffect, useRef, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Button, Slide, Stack, Typography } from '@mui/material';

import { users } from 'common/routes/api';
import { PAGE_APP_HOME, PAGE_APP_LOGIN } from 'common/routes/pages';
import { Form } from 'components/Form';
import { Input } from 'components/Form/components/Input';
import { Main } from 'layouts/Main';
import { fetch } from 'lib/fetch';

export default RegisterPage;
export { getServerSideProps };
function RegisterPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const slideRef = useRef(null);
  // any below due to lack of time to figure out the issue
  const handleSubmit = (data: any) => {
    setLoading(true);
    fetch
      .post(users.create.url, data)
      .then(() => {
        router.push(PAGE_APP_LOGIN + '?registered=true');
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => setError(false), 1500);

      return () => clearTimeout(timerId);
    }
  }, [error]);

  return (
    <Stack
      ref={slideRef}
      overflow={'hidden'}
      rowGap={4}
      position={'relative'}
    >
      <Typography
        variant={'h1'}
        textAlign={'center'}
        fontSize={'3rem'}
      >
        Регистрация
      </Typography>

      <Form
        onSubmit={handleSubmit}
        justifyContent={'center'}
        alignItems={'center'}
        bgcolor={(theme) => theme.palette.secondary.dark}
        borderRadius={2}
        sx={{ p: 15 }}
        position={'relative'}
      >
        {({ register }) => (
          <Stack rowGap={4}>
            <Input
              label={'Ваше имя'}
              name={'name'}
              register={register}
              options={{ required: true, min: 6 }}
            />
            <Input
              label={'Логин'}
              name={'login'}
              register={register}
              options={{ required: true, min: 6 }}
            />
            <Input
              label={'Пароль'}
              name={'password'}
              type={'password'}
              register={register}
              options={{ required: true, min: 6 }}
            />
            <Stack rowGap={4}>
              <LoadingButton
                variant={'contained'}
                color={'primary'}
                type={'submit'}
                loading={loading}
                loadingIndicator={'Проверяем...'}
                fullWidth
              >
                Зарегистрироваться
              </LoadingButton>
              <Link
                href={PAGE_APP_LOGIN}
                passHref
              >
                <Button>Войти</Button>
              </Link>
            </Stack>
          </Stack>
        )}
      </Form>
      <Slide
        in={error}
        direction={'up'}
        container={slideRef.current}
      >
        <Box
          bgcolor={(theme) => theme.palette.error.main}
          p={3}
          borderRadius={1}
          position={'absolute'}
          bottom={0}
          left={0}
          right={0}
        >
          <Typography textAlign={'center'}>Логин занят</Typography>
        </Box>
      </Slide>
    </Stack>
  );
}

RegisterPage.getLayout = (page: ReactElement) => {
  return (
    <Main sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {page}
    </Main>
  );
};

const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        statusCode: 302,
        destination: PAGE_APP_HOME,
      },
    };
  }

  return {
    props: {},
  };
};
