import { auth } from '@/app/auth'
import { env } from '@/config/env'
import type { Customer, FlyFoodError, Store } from './types'
import { Session } from 'next-auth'

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

export const getStoreByV1 = async (id: string): Promise<Store> => {
  const token = await auth()
  const req = await fetch(`${client.baseURL}/v1/store?id=${id}`, {
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
