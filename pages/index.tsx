import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';

import { Link as MuiLink, Stack, Typography } from '@mui/material';

import { PAGE_APP_STATIONS, PAGE_APP_USERS } from 'common/routes/pages';
import { Table } from 'components/Table';
import { TableColumn, TableRow } from 'components/Table/table.types';
import { useStore } from 'lib/store';

export default HomePage;
export { getServerSideProps };

function HomePage() {
  const stations = useStore((state) => state.stations);
  const session = useSession();
  const users = useStore((state) => state.users);
  const deleteStation = useStore((state) => state.deleteStation);
  const deleteUser = useStore((state) => state.deleteUser);
  const onDelete = (jwt: string, cb: (id: number, jwt: string) => void) => {
    return (id: number) => cb(id, jwt);
  };

  if (!session.data) return null;

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      columnGap={8}
      rowGap={8}
      py={5}
      px={5}
    >
      {[
        {
          href: PAGE_APP_USERS,
          onDelete: onDelete(session.data.jwt, deleteStation),
          title: 'Пользователи',
          columns: [
            { id: 'id', label: 'ID' },
            { id: 'name', label: 'Имя пользователя' },
            { id: 'login', label: 'Логин' },
            { id: 'actions', label: 'Действия', align: 'right' },
          ],
          rows: users,
        },
        {
          href: PAGE_APP_STATIONS,
          onDelete: onDelete(session.data.jwt, deleteUser),
          title: 'Станции',
          columns: [
            { id: 'id', label: 'ID' },
            { id: 'name', label: 'Имя станции' },
            { id: 'actions', label: 'Действия', align: 'right' },
          ],
          rows: stations,
        },
      ].map(({ href, columns, rows, title, onDelete }) => (
        <Stack
          rowGap={5}
          key={href}
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography
              variant={'h2'}
              fontSize={{ xs: '2rem' }}
            >
              {title}
            </Typography>
            <Typography>
              <Link
                href={href}
                passHref
              >
                <MuiLink underline={'none'}>Посмотреть всех</MuiLink>
              </Link>
            </Typography>
          </Stack>
          <Table
            onDelete={onDelete}
            slice={5}
            columns={columns as TableColumn[]}
            rows={rows as TableRow[]}
          />
        </Stack>
      ))}
    </Stack>
  );
}

const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/login',
      },
    };
  }

  return {
    props: { session },
  };
};
