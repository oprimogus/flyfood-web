import { env } from '@/config/env'
import NextAuth from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import ZITADEL from 'next-auth/providers/zitadel'
import type { AdapterUser } from 'next-auth/adapters'
import * as openid from 'openid-client'
import { ZitadelApi } from '@/service/zitadel/service'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string // ID do usuário
      email: string // Email do usuário
      name: string // Nome do usuário
      roles?: string[] // Role personalizada
      accessToken: string
      // Adicione mais campos conforme necessário
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    expiresAt: number
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser {
    'urn:zitadel:iam:org:project:roles'?: {
      [role: string]: {
        [key: string]: string
      }
    }
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const baseURL = new URL(env.zitadel.issuer)
    const conf = await openid.discovery(
      baseURL,
      env.zitadel.clientID,
      {},
      undefined,
      {
        execute: [openid.allowInsecureRequests]
      }
    )

    if (!token.refreshToken) {
      return signIn('zitadel')
    }

    const { access_token, refresh_token, expires_in, id_token } =
      await openid.refreshTokenGrant(conf, token.refreshToken)
    return {
      ...token,
      accessToken: access_token,
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
      clientSecret: env.zitadel.clientSecret,
      issuer: env.zitadel.issuer,
      authorization: {
        params: {
          scope: 'openid profile email phone urn:zitadel:iam:user:metadata urn:zitadel:iam:org:project:roles'
        }
      },
      async profile(profile) {
        return { ...profile }
      }
    })
  ],
  callbacks: {
    signIn({ account }) {
      if (account?.provider === 'zitadel') {
        return true
      }
      return false
    },
    jwt({ token, account, user }) {
      token.accessToken ??= account?.access_token
      token.refreshToken ??= account?.refresh_token
      token.expiresAt ??= (account?.expires_at ?? 0) * 1000
      token.error = undefined
      if (Date.now() < token.expiresAt) {
        return token
      }
      return refreshAccessToken(token)
    },
    async session({ session, token, user }) {
      if (Date.now() > token.expiresAt) {
        throw new Error('Session expired')
      }

      const userInfo = await ZitadelApi.getInstance().getUserInfoV1(token.accessToken as string)
      if (!userInfo.ok) {
        throw new Error('Error fetching user info')
      }
      const roles: string[] = []
      const zitadelRoles = userInfo.value['urn:zitadel:iam:org:project:roles']
      if (zitadelRoles) {
        roles.push(...Object.keys(zitadelRoles))
      }
      session.user = {
        ...user,
        id: user?.id,
        email: user?.email,
        name: user?.name ?? '',
        accessToken: token.accessToken ?? '',
        roles: roles
      }
      return session
    },
    authorized: async ({ auth }) => {
      return !!auth
    }
  }
})
