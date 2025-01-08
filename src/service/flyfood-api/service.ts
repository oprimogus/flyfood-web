import { auth } from '@/app/auth'
import { env } from '@/config/env'
import type { Address, Customer, FlyFoodError, FlyFoodValidationError, GetStoresByFilter, QueryStore, Store } from './types'
import { Session } from 'next-auth'
import { fetchApi, Result } from '@/service/http'

const client = {
  baseURL: env.clients.flyfoodApi.baseURL
}

export const getCustomerV1 = async (session: Session): Promise<Customer> => {
  const req = await fetch(`${client.baseURL}/v1/customer`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user.accessToken}`
    }
  })

  if (!req.ok) {
    const errorData = await req.json()
    throw new Error(
      `Error fetching customer data: ${JSON.stringify(errorData)}`
    )
  }

  return await req.json()
}

export const addNewAddressV1 = async (session: Session, params: Address): Promise<void> => {
  console.log('addNewAddress: ', params)
  const req = await fetch(`${client.baseURL}/v1/customer/address`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user.accessToken}`
    },
    body: JSON.stringify(params),
  })
  if (!req.ok) {
    const errorData = await req.json()
    console.log('addNewAddress: ', errorData)
    throw new Error(
      errorData
    )
  }
  console.log('addNewAddress: ', await req.json())
}

export const getStoreByIDV1 = async (id: string): Promise<Store> => {
  const token = await auth()
  const req = await fetch(`${client.baseURL}/v1/store/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.user.accessToken}`
    }
  })

  if (!req.ok) {
    const reqError = (await req.json()) as FlyFoodError
    throw new Error(reqError.error)
  }

  return await req.json()
}

export const getStoreByFilterV1 = async (params: GetStoresByFilter, token: string) => {
  console.log('getStoreByFilterV1: ', 'Foi chamado')
  console.log('getStoreByFilterV1: ', params)
  try {
    const queryParams = new URLSearchParams()

    if (params.name) queryParams.append('name', params.name)
    if (params.city) queryParams.append('city', params.city)
    if (params.isOpen) queryParams.append('isOpen', params.isOpen.toString())
    if (params.type) queryParams.append('type', params.type)
    if (params.page) queryParams.append('page', String(params.page))
    if (params.maxItems) queryParams.append('maxItems', String(params.maxItems))

    const query = queryParams.toString() ? `?${queryParams.toString()}` : ''

    const req = await fetch(`${client.baseURL}/v1/store${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!req.ok) {
      const reqError = (await req.json()) as FlyFoodError
      throw new Error(reqError.error)
    }

    const result = await req.json()

    console.log('getStoreByFilterV1: ', params)
    console.log('getStoreByFilterV1: ', result)

    return result

  } catch (error) {
    console.log(error)
    throw error

  }

}

export class FlyFoodApi {
  private static instance: FlyFoodApi
  private readonly baseURL = env.clients.flyfoodApi.baseURL

  private constructor() { }

  public static getInstance(): FlyFoodApi {
    if (!FlyFoodApi.instance) {
      FlyFoodApi.instance = new FlyFoodApi()
    }

    return FlyFoodApi.instance
  }

  async getCustomerV1(session: Session): Promise<Result<Customer, FlyFoodError>> {
    return await fetchApi<Customer, FlyFoodError>(this.baseURL, '/v1/customer', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  }

  async addNewAddressV1(session: Session, params: Address): Promise<Result<void, FlyFoodError>> {
    return await fetchApi<void, FlyFoodError>(this.baseURL, '/v1/customer/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      requestBody: params,
    })
  }

  async removeAddressV1(session: Session, params: Address): Promise<Result<void, FlyFoodError>> {
    return await fetchApi<void, FlyFoodError>(this.baseURL, '/v1/customer/address', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      requestBody: params,
    })
  }

  async getStoreByIDV1(session: Session, id: string): Promise<Result<Store, FlyFoodError>> {
    return await fetchApi<Store, FlyFoodError>(this.baseURL, `/v1/store/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  }

  async getStoreByFilterV1(session: Session, params: GetStoresByFilter): Promise<Result<QueryStore[], FlyFoodValidationError>> {
    const queryParams: Record<string, string> = {}
    if (params.name) queryParams.name = params.name
    if (params.city) queryParams.city = params.city
    if (params.isOpen) queryParams.isOpen = String(params.isOpen)
    if (params.type) queryParams.type = String(params.type)
    if (params.page) queryParams.page = String(params.page)
    if (params.maxItems) queryParams.maxItems = String(params.maxItems)

    return await fetchApi<QueryStore[], FlyFoodValidationError>(this.baseURL, '/v1/store', {
      method: 'GET',
      query: queryParams,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  
  }

}

export const flyFoodApi = FlyFoodApi.getInstance()
