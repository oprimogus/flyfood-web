export enum Environment {
  Production = 'production',
  Staging = 'staging',
  Development = 'development',
  Testing = 'testing',
}

export const env = {
  environment: import.meta.env.MODE ?? '',
  zitadel: {
    issuer: import.meta.env.VITE_ZITADEL_ISSUER ?? '',
    clientID: import.meta.env.VITE_ZITADEL_CLIENT_ID ?? '',
    projectID: import.meta.env.VITE_ZITADEL_PROJECT_RESOURCE_ID ?? '',
  },
  clients: {
    flyfoodApi: {
      baseURL: import.meta.env.VITE_CLIENT_FLYFOOD_API ?? 'https://dev.flyfood.com.br/flyfood-api',
    },
    viacep: {
      baseURL: import.meta.env.VITE_CLIENT_VIACEP_API ?? 'https://viacep.com.br',
    },
  },
}
