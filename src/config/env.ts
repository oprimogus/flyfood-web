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
    projectID: process.env.AUTH_ZITADEL_PROJECT_ID ?? '',
  },
  clients: {
    flyfoodApi: {
      baseURL: process.env.CLIENT_FLYFOOD_API ?? 'http://localhost:3000/flyfood-api'
    },
    viacep: {
      baseURL: process.env.CLIENT_VIACEP_API ?? 'http://viacep.com.br'
    }
  }
}
