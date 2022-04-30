import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { users } from 'common/routes/api';
import type { User } from 'common/types/users';
import { fetch } from 'lib/fetch';

export default NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        login: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async (creds) => {
        const { login, password } = creds || {};

        try {
          const { data } = await fetch.post(users.auth.url, { login, password });
          const { data: user } = await fetch.get<User>(users.me.url, {
            headers: { 'user-jwt': data.user_jwt },
          });

          return { ...user, jwt: data.user_jwt };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: '/',
    signOut: '/login',
  },
});
