import { auth } from '@/app/auth'
import { env } from '@/config/env'
import type { Customer, FlyFoodError, GetStoresByFilter, Store } from './types'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

const client = {
  baseURL: env.clients.flyfoodApi.baseURL
}

export const getCustomerV1 = async (session: Session): Promise<Customer> => {
  const req = await fetch(`${client.baseURL}/v1/customer`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`
    },
    next: {
      revalidate: 10,
      tags: ['customer']
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

export const getStoreByIDV1 = async (id: string): Promise<Store> => {
  const token = await auth()
  const req = await fetch(`${client.baseURL}/v1/store/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.user.accessToken}`
    },
    next: {
      revalidate: 10,
      tags: [`store-${id}`]
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
        Authorization: `Bearer ${token}`
      },
      next: {
        revalidate: 10,
        tags: [`stores-${params.city}`]
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
