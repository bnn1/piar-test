import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { USERS } from 'common/routes/api';
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
          const { data } = await fetch.post<{ user_jwt: string }>(USERS.AUTH.URL, {
            login,
            password,
          });

          if (data && data.user_jwt) {
            const { data: user } = await fetch.get<User>(USERS.ME.URL, data.user_jwt);

            return { ...user, jwt: data.user_jwt };
          }
        } catch (err) {
          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const { jwt, ...rest } = user;

        token.jwt = jwt;
        token.user = rest;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        ...(token.user as Record<string, any>),
      };

      session.jwt = token.jwt as string;

      return session;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 4 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
});
