import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

import { Stack, Typography } from '@mui/material';

import { UpdateStation } from 'common/types/users';
import { Table } from 'components/Table';
import { TableColumn, TableRow } from 'components/Table/table.types';
import { useStore } from 'lib/store';

export default UsersPage;
export { getServerSideProps };

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Имя станции' },
  { id: 'comment', label: 'Комментарий' },
  { id: 'actions', label: 'Действия', align: 'right' },
];

function UsersPage() {
  const session = useSession();
  const stations = useStore((state) => state.stations);
  const deleteStation = useStore((state) => state.deleteStation);
  const updateStation = useStore((state) => state.updateStation);
  const onDelete = (jwt: string, cb: typeof deleteStation) => {
    return (id: number) => cb(id, jwt);
  };
  const onEdit = (jwt: string, cb: typeof updateStation) => {
    return (id: number, updatedItem: UpdateStation) => cb(id, updatedItem, jwt);
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
            Станции
          </Typography>
        </Stack>
        <Table
          tableName={'Пользователи'}
          onDelete={onDelete(session.data.jwt, deleteStation)}
          onEdit={onEdit(session.data.jwt, updateStation)}
          columns={columns as TableColumn[]}
          rows={stations as TableRow[]}
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
