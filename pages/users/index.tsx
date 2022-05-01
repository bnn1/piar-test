import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

import { Stack, Typography } from '@mui/material';

import { UpdateUser } from 'common/types/users';
import { Table } from 'components/Table';
import { TableColumn, TableRow } from 'components/Table/table.types';
import { useStore } from 'lib/store';

export default UsersPage;
export { getServerSideProps };

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Имя пользователя' },
  { id: 'login', label: 'Логин' },
  { id: 'comment', label: 'Комментарий' },
  { id: 'actions', label: 'Действия', align: 'right' },
];

function UsersPage() {
  const session = useSession();
  const users = useStore((state) => state.users);
  const deleteUser = useStore((state) => state.deleteUser);
  const updateUser = useStore((state) => state.updateUser);
  const onDelete = (jwt: string, cb: typeof deleteUser) => {
    return (id: number) => cb(id, jwt);
  };
  const onEdit = (jwt: string, cb: typeof updateUser) => {
    return (id: number, updatedItem: UpdateUser) => cb(id, updatedItem, jwt);
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
      <Stack
        rowGap={5}
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
            Пользователи
          </Typography>
        </Stack>
        <Table
          tableName={'Пользователи'}
          onDelete={onDelete(session.data.jwt, deleteUser)}
          onEdit={onEdit(session.data.jwt, updateUser)}
          columns={columns as TableColumn[]}
          rows={users as TableRow[]}
        />
      </Stack>
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
