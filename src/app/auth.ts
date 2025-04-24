import { Environment, env } from '@/config/env'
import {
  type ZitadelRole,
  type ZitadelUserInfo,
  isValidRole
} from '@/service/zitadel/types'
import * as jose from 'jose'
import NextAuth from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import ZITADEL from 'next-auth/providers/zitadel'
import * as openid from 'openid-client'

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

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    idToken?: string
    refreshToken?: string
    expiresAt: number
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const baseURL = new URL(env.zitadel.issuer)
    let conf: openid.Configuration
    if (env.environment === Environment.Production) {
      conf = await openid.discovery(baseURL, env.zitadel.clientID, {})
    } else {
      conf = await openid.discovery(
        baseURL,
        env.zitadel.clientID,
        {},
        undefined,
        {
          execute: [openid.allowInsecureRequests]
        }
      )
    }

    if (!token.refreshToken) {
      return signIn('zitadel')
    }

    const { access_token, refresh_token, expires_in, id_token } =
      await openid.refreshTokenGrant(conf, token.refreshToken)
    return {
      ...token,
      accessToken: access_token,
      idToken: id_token,
      expiresAt: (expires_in ?? 0) * 1000,
      refreshToken: refresh_token
    }
  } catch (error) {
    console.error('Error during refreshAccessToken', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
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
        }
      },
    })
  ],
  callbacks: {
    signIn({ account }) {
      if (account?.provider === 'zitadel') {
        return true
      }
      return false
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.expiresAt = (account.expires_at ?? 0) * 1000
      }
      if (Date.now() < token.expiresAt) {
        return token
      }
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken ?? ''
      session.user.idToken = token.idToken ?? ''
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
    authorized: async ({ auth }) => {
      return !!auth
    }
  }
})
