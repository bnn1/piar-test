import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';

import { Link as MuiLink, Stack, Typography } from '@mui/material';

import { PAGE_APP_STATIONS, PAGE_APP_USERS } from 'common/routes/pages';
import { UpdateStation, UpdateUser } from 'common/types/users';
import { Table } from 'components/Table';
import { TableColumn, TableRow } from 'components/Table/table.types';
import { useStore } from 'lib/store';

export default HomePage;
export { getServerSideProps };

function HomePage() {
  const stations = useStore((state) => state.stations);
  const session = useSession();
  const users = useStore((state) => state.users);
  const deleteUser = useStore((state) => state.deleteUser);
  const deleteStation = useStore((state) => state.deleteStation);
  const updateUser = useStore((state) => state.updateUser);
  const updateStation = useStore((state) => state.updateStation);
  const onDelete = (jwt: string, cb: typeof deleteUser | typeof deleteStation) => {
    return (id: number) => cb(id, jwt);
  };
  const onEdit = (jwt: string, cb: typeof updateStation | typeof updateUser) => {
    return (id: number, updatedItem: UpdateStation | UpdateUser) => cb(id, updatedItem, jwt);
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
          onDelete: onDelete(session.data.jwt, deleteUser),
          onEdit: onEdit(session.data.jwt, updateUser),
          title: 'Пользователи' as const,
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
          onDelete: onDelete(session.data.jwt, deleteStation),
          onEdit: onEdit(session.data.jwt, updateStation),
          title: 'Станции' as const,
          columns: [
            { id: 'id', label: 'ID' },
            { id: 'name', label: 'Имя станции' },
            { id: 'actions', label: 'Действия', align: 'right' },
          ],
          rows: stations,
        },
      ].map(({ href, columns, rows, title, onDelete, onEdit }) => (
        <Stack
          rowGap={5}
          key={href}
          flex={1}
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
            tableName={title}
            onDelete={onDelete}
            onEdit={onEdit}
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
