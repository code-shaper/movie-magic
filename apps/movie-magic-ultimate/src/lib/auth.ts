import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const config: NextAuthConfig = {
  providers: [GitHub, Google],
  pages: {
    signIn: '/sign-in',
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
