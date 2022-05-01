import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

import { ReactElement, useEffect, useRef, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Button, Slide, Stack, Typography } from '@mui/material';

import { PAGE_APP_HOME, PAGE_APP_LOGIN, PAGE_APP_REGISTER } from 'common/routes/pages';
import { Form } from 'components/Form';
import { Input } from 'components/Form/components/Input';
import { Main } from 'layouts/Main';

export default LoginPage;
export { getServerSideProps };

function LoginPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const router = useRouter();
  const slideRef = useRef(null);
  // any below due to lack of time to figure out the issue
  const handleSubmit = (data: any) => {
    setLoading(true);
    signIn('credentials', { ...data, redirect: false }).then((res: any) => {
      setLoading(false);
      if (res?.ok) {
        router.push(res.url === PAGE_APP_LOGIN ? PAGE_APP_HOME : res.url);
      } else {
        setError(true);
      }
    });
  };

  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => setError(false), 1500);

      return () => clearTimeout(timerId);
    }
  }, [error]);
  useEffect(() => {
    if (registered) {
      const timerId = setTimeout(() => setRegistered(false), 5000);

      return () => clearTimeout(timerId);
    }
  }, [registered]);
  useEffect(() => {
    setRegistered(!!router.query.registered);
  }, [router.query.registered]);

  return (
    <Stack
      ref={slideRef}
      overflow={'hidden'}
      rowGap={4}
      position={'relative'}
    >
      <Form
        onSubmit={handleSubmit}
        justifyContent={'center'}
        alignItems={'center'}
        bgcolor={(theme) => theme.palette.secondary.dark}
        borderRadius={2}
        sx={{ p: 15 }}
        position={'relative'}
        rowGap={5}
      >
        <Typography
          variant={'h1'}
          textAlign={'center'}
          fontSize={'3rem'}
        >
          Вход
        </Typography>
        <Input
          label={'Логин'}
          name={'login'}
          options={{ required: { value: true, message: 'Это обязательное поле' } }}
        />
        <Input
          label={'Пароль'}
          name={'password'}
          type={'password'}
          options={{ required: { value: true, message: 'Это обязательное поле' } }}
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
            Войти
          </LoadingButton>
          <Link
            href={PAGE_APP_REGISTER}
            passHref
          >
            <Button>Регистрация</Button>
          </Link>
        </Stack>
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
        >
          <Typography textAlign={'center'}>
            Пользователя с указанными данными не существует
          </Typography>
        </Box>
      </Slide>
      <Slide
        in={registered}
        direction={'down'}
        container={slideRef.current}
      >
        <Box
          bgcolor={(theme) => theme.palette.success.main}
          p={3}
          borderRadius={1}
          position={'absolute'}
          top={0}
          left={0}
          right={0}
        >
          <Typography textAlign={'center'}>
            Теперь вы можете войти используя данные, указанные при регистрации
          </Typography>
        </Box>
      </Slide>
    </Stack>
  );
}

LoginPage.getLayout = (page: ReactElement) => {
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
        statusCode: 303,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
};
