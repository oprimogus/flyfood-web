import { env } from '@/config/env'
import {
  type ZitadelRole,
  type ZitadelUserInfo,
  isValidRole
} from '@/service/zitadel/types'
import * as jose from 'jose'
import NextAuth from 'next-auth'
import ZITADEL from 'next-auth/providers/zitadel'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      roles?: ZitadelRole[]
      accessToken: string
      idToken: string
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    ZITADEL({
      clientId: env.zitadel.clientID,
      issuer: env.zitadel.issuer,
      authorization: {
        params: {
          scope: `openid profile email urn:zitadel:iam:org:project:id:${env.zitadel.projectID}:aud`,
          prompt: 'select_account',
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string
      session.user.idToken = token.idToken as string
      const userInfo = jose.decodeJwt(session.user.idToken) as ZitadelUserInfo
      const rolesSet = new Set<ZitadelRole>()
      for (const [key, value] of Object.entries(userInfo)) {
        if (
          key.startsWith('urn:zitadel:iam:org:project:') &&
          key.endsWith(':roles')
        ) {
          for (const role of Object.keys(value as Record<string, unknown>)) {
            if (isValidRole(role)) {
              rolesSet.add(role as ZitadelRole)
            }
          }
        }
      }
      session.user.roles = Array.from(rolesSet)
      return session
    },
  }
})
