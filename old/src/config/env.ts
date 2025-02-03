export const env = {
  zitadel: {
    issuer: process.env.AUTH_ZITADEL_ISSUER ?? '',
    clientID: process.env.AUTH_ZITADEL_ID ?? '',
    clientSecret: process.env.AUTH_ZITADEL_SECRET ?? ''
  },
  clients: {
    flyfoodApi: {
      baseURL: process.env.CLIENT_FLYFOOD_API ?? 'http://localhost:3000/api'
    },
    viacep: {
      baseURL: process.env.CLIENT_VIACEP_API ?? 'http://viacep.com.br'
    }
  }
}
