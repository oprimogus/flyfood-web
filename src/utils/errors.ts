export class ApiError extends Error {
  constructor(message: string) {
    super('Ocorreu um erro inesperado. Por favor, trente novamente mais tarde.')
    this.name = 'ApiError'
  }
}