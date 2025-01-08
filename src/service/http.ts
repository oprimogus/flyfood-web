export type Result<T, E = Error> =
  | { ok: true, value: T }
  | { ok: false, error: E }

export type ApiError = {
  code: string
  message: string
  exception?: Error
}

export type FetchOptions = RequestInit & {
  requestBody?: Object
  query?: Record<string, string>
}

export async function fetchApi<T = void, E = ApiError>(
  baseURL: string,
  endpoint: string,
  options: FetchOptions
): Promise<Result<T, E>> {
  try {
    const { method = 'GET', headers, requestBody, query } = options
    const url = new URL(`${baseURL}${endpoint}`)
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.append(key, value)
      }
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    }

    const response = await fetch(url.toString(), fetchOptions)

    const text = await response.text()
    const responseBody = text ? JSON.parse(text) : undefined

    if (!response.ok) {
      return {
        ok: false,
        error: {
          code: response.status.toString(),
          message: response.statusText || 'Unknown error',
          ...(responseBody as E),
        },
      }
    }

    return { ok: true, value: responseBody as T || (undefined as T) }
  } catch (error: any) {
    return {
      ok: false,
      error: {
        code: 'FETCH_ERROR',
        message: error.message || 'Network error',
        exception: error,
      } as E,
    }
  }
}

