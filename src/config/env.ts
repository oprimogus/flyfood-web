export enum Environment {
  Production = 'production',
  Staging = 'staging',
  Development = 'development',
  Testing = 'testing'
}

export const env = {
  environment: process.env.NODE_ENV ?? '',
  zitadel: {
    issuer: process.env.AUTH_ZITADEL_ISSUER ?? '',
    clientID: process.env.AUTH_ZITADEL_ID ?? '',
    clientSecret: process.env.AUTH_ZITADEL_SECRET ?? '',
    projectID: process.env.AUTH_ZITADEL_PROJECT_ID ?? ''
  },
  clients: {
    flyfoodApi: {
      baseURL:
        process.env.NEXT_PUBLIC_CLIENT_FLYFOOD_API ?? 'https://flyfood.com.br/flyfood-api'
    },
    viacep: {
      baseURL: process.env.NEXT_PUBLIC_CLIENT_VIACEP_API ?? 'https://viacep.com.br'
    }
  }
}
