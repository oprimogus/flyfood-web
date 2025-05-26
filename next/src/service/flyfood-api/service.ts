import { env } from '@/config/env'
import { type Result, fetchApi } from '@/utils/http'
import type { Session } from 'next-auth'
import type {
  Address,
  Customer,
  FlyFoodError,
  FlyFoodValidationError,
  GetStoresByFilterInput,
  Pagination,
  QueryOwnerStore,
  QueryOwnerStoreList,
  QueryStore,
  QueryStoreList
} from './types'

export function handleApiError(error: unknown): FlyFoodError {
  try {
    if (error instanceof Error) {
      return JSON.parse(error.message) as FlyFoodError
    }
    return {
      message: 'Ocorreu um erro inesperado',
      error: 'Ocorreu um erro inesperado',
      details: [],
      code: '500',
      traceID: 'unknown'
    }
  } catch {
    return {
      message: 'Ocorreu um erro inesperado',
      error: 'Ocorreu um erro inesperado',
      details: [],
      code: '500',
      traceID: 'unknown'
    }
  }
}

export class FlyFoodApi {
  private static instance: FlyFoodApi
  private readonly baseURL = env.clients.flyfoodApi.baseURL

  private constructor() {}

  public static getInstance(): FlyFoodApi {
    if (!FlyFoodApi.instance) {
      FlyFoodApi.instance = new FlyFoodApi()
    }

    return FlyFoodApi.instance
  }

  async getCustomerV1(
    session: Session
  ): Promise<Result<Customer, FlyFoodError>> {
    return await fetchApi<Customer, FlyFoodError>(
      this.baseURL,
      '/v1/customer',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`
        }
      }
    )
  }

  async addNewAddressV1(
    session: Session,
    params: Address
  ): Promise<Result<void, FlyFoodError>> {
    return await fetchApi<void, FlyFoodError>(
      this.baseURL,
      '/v1/customer/address',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`
        },
        requestBody: params
      }
    )
  }

  async removeAddressV1(
    session: Session,
    params: Address
  ): Promise<Result<void, FlyFoodError>> {
    return await fetchApi<void, FlyFoodError>(
      this.baseURL,
      '/v1/customer/address',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`
        },
        requestBody: params
      }
    )
  }

  async getStoreByIDV1(
    session: Session,
    id: string
  ): Promise<Result<QueryStore, FlyFoodError>> {
    return await fetchApi<QueryStore, FlyFoodError>(
      this.baseURL,
      `/v1/store/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`
        }
      }
    )
  }

  async getStoreByFilterV1(
    session: Session,
    params: GetStoresByFilterInput
  ): Promise<Result<Pagination<QueryStoreList>, FlyFoodValidationError>> {
    const queryParams: Record<string, string> = {}
    if (params.name) queryParams.name = params.name
    if (params.city) queryParams.city = params.city
    if (params.score && params.score > 0)
      queryParams.score = String(params.score)
    if (params.isOpen) queryParams.isOpen = String(params.isOpen)
    if (params.type) queryParams.type = String(params.type)
    if (params.page) queryParams.page = String(params.page)
    if (params.maxItems) queryParams.maxItems = String(params.maxItems)

    return await fetchApi<Pagination<QueryStoreList>, FlyFoodValidationError>(
      this.baseURL,
      '/v1/store',
      {
        method: 'GET',
        query: queryParams,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`
        }
      }
    )
  }

  async getOwnerStoresV1(
    session: Session
  ): Promise<Result<QueryOwnerStoreList[], FlyFoodError>> {
    return await fetchApi<QueryOwnerStoreList[], FlyFoodError>(
      this.baseURL,
      '/v1/owner/store/all',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`
        }
      }
    )
  }

  async getOwnerStoreByIDV1(
    session: Session,
    id: string
  ): Promise<Result<QueryOwnerStore, FlyFoodError>> {
    return await fetchApi<QueryOwnerStore, FlyFoodError>(
      this.baseURL,
      `/v1/owner/store/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`
        }
      }
    )
  }
}

export const flyFoodApi = FlyFoodApi.getInstance()
