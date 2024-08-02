import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const config: NextAuthConfig = {
  providers: [GitHub, Google],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Simulate asynchronous behavior
      await Promise.resolve();
      // Logged in users are authenticated, otherwise redirect to login page
      return Boolean(auth);
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
