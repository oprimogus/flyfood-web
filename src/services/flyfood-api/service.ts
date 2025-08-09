import { env } from '@/config/env'
import {
  type Address,
  type Customer,
  type GetStoresByFilterInput,
  type Pagination,
  type QueryOwnerStore,
  type QueryOwnerStoreList,
  type QueryStore,
  type QueryStoreList,
} from './types'
import { FlyFoodException } from './errors'

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

  async getCustomerV1(accessToken: string): Promise<Customer> {
    const response = await fetch(this.baseURL + '/v1/customer', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const responseBody = await response.json()
    if (!response.ok) {
      throw new FlyFoodException(responseBody, response.status)
    }
    return responseBody as Customer
  }

  async addNewAddressV1(accessToken: string, params: Address): Promise<void> {
    const response = await fetch(this.baseURL + '/v1/customer/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new FlyFoodException(errorBody, response.status)
    }
    
    return
  }

  async removeAddressV1(accessToken: string, params: Address): Promise<void> {
      const response = await fetch(this.baseURL + '/v1/customer/address', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
  
      const responseBody = await response.json()
      if (!response.ok) {
        throw new FlyFoodException(responseBody, response.status)
      }
      return
  }

  async getStoreByIDV1(accessToken: string, id: string): Promise<QueryStore> {
    const response = await fetch(this.baseURL + `/v1/store/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const responseBody = await response.json()
    if (!response.ok) {
      throw new FlyFoodException(responseBody, response.status)
    }
    return responseBody as QueryStore
  }

  async getStoreByFilterV1(
    accessToken: string,
    params: GetStoresByFilterInput,
  ): Promise<Pagination<QueryStoreList>> {
    const queryParams: Record<string, string> = {}
    if (params.name) queryParams.name = params.name
    if (params.city) queryParams.city = params.city
    if (params.score && params.score > 0) queryParams.score = String(params.score)
    if (params.isOpen !== undefined) queryParams.isOpen = String(params.isOpen)
    if (params.type) queryParams.type = String(params.type)
    if (params.page) queryParams.page = String(params.page)
    if (params.maxItems) queryParams.maxItems = String(params.maxItems)
  
    const searchParams = new URLSearchParams(queryParams)
    const queryString = searchParams.toString()
    const url = `${this.baseURL}/v1/store${queryString ? `?${queryString}` : ''}`
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  
    const responseBody = await response.json()
    
    if (!response.ok) {
      throw new FlyFoodException(responseBody, response.status)
    }
  
    return responseBody as Pagination<QueryStoreList>
  }

  async getOwnerStoresV1(
    accessToken: string,
  ): Promise<QueryOwnerStoreList[]> {   
    const response = await fetch(this.baseURL + '/v1/owner/store', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const responseBody = await response.json()
    if (!response.ok) {
      throw new FlyFoodException(responseBody, response.status)
    }
    return responseBody as QueryOwnerStoreList[]
  }

  async getOwnerStoreByIDV1(
    accessToken: string,
    id: string,
  ): Promise<QueryOwnerStore> {
      const response = await fetch(this.baseURL + `/v1/owner/store/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
  
      const responseBody = await response.json()
      if (!response.ok) {
        throw new FlyFoodException(responseBody, response.status)
      }
      return responseBody as QueryOwnerStore
  }
}

export const flyFoodApi = FlyFoodApi.getInstance()
