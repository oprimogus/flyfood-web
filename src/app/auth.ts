import { env } from '@/config/env';
import NextAuth from 'next-auth';
import ZITADEL from 'next-auth/providers/zitadel';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // ID do usuário
      email: string; // Email do usuário
      name: string; // Nome do usuário
      role?: string; // Role personalizada
      accessToken: string;
      // Adicione mais campos conforme necessário
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    ZITADEL({
      clientId: env.zitadel.clientID,
      clientSecret: env.zitadel.clientSecret,
      issuer: env.zitadel.issuer,
      authorization: {
        params: {
          scope: 'openid profile email phone',
        },
      },
      async profile(profile) {
        return { ...profile };
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account?.provider === 'zitadel') {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
});
