export type FlyFoodError = {
  traceID: string
  error: string
  details?: unknown
  debug?: unknown
}

export type FlyFoodFieldError = {
  field: string
  input: string
  message: string
  debug?: string
}

export type FlyFoodValidationError = Omit<FlyFoodError, 'details'> & {
  details: FlyFoodFieldError[]
}

export function isFlyFoodError(error: unknown): error is FlyFoodError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'traceID' in error &&
    'error' in error &&
    typeof (error as FlyFoodError).traceID === 'string' &&
    typeof (error as FlyFoodError).error === 'string'
  )
}

export function isFlyFoodValidationError(error: unknown): error is FlyFoodValidationError {
  return (
    isFlyFoodError(error) &&
    'details' in error &&
    Array.isArray((error as FlyFoodValidationError).details) &&
    (error as FlyFoodValidationError).details.every(
      (detail) =>
        typeof detail === 'object' &&
        detail !== null &&
        'field' in detail &&
        'input' in detail &&
        'message' in detail,
    )
  )
}

export class FlyFoodException extends Error {
  public readonly error: FlyFoodError | FlyFoodValidationError | undefined
  public readonly status: number

  constructor(error: unknown, status: number) {
    let message = 'Ocorreu um erro inesperado'
    let flyFoodError: FlyFoodError | FlyFoodValidationError | undefined
    if (isFlyFoodError(error) || isFlyFoodValidationError(error)) {
      flyFoodError = error
      message = flyFoodError.error
    } else if (error instanceof Error) {
      message = error.message
    } else if (typeof error === 'string') {
      message = error
    }

    super(message)
    this.name = 'FlyFoodException'
    Object.setPrototypeOf(this, FlyFoodException.prototype)
    this.status = status
    this.error = flyFoodError
  }
}