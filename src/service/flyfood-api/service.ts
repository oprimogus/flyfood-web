import { auth } from '@/app/auth';
import { env } from '@/config/env';
import type { Customer, FlyFoodError, Store } from './types';

const client = {
  baseURL: env.clients.flyfoodApi.baseURL,
};

export const getCustomerV1 = async (): Promise<Customer | FlyFoodError> => {
  const token = await auth();
  const req = await fetch(`${client.baseURL}/v1/customer`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.user.accessToken}`,
    },
    next: {
      revalidate: 10,
      tags: ['get-customer'],
    },
  });

  if (!req.ok) {
    const errorData = await req.json();
    return errorData as FlyFoodError;
  }

  return await req.json();
};

export const getStoreByIDV1 = async (id: string): Promise<Store> => {
  const token = await auth();
  const req = await fetch(`${client.baseURL}/v1/store?id=${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.user.accessToken}`,
    },
    next: {
      revalidate: 10,
      tags: [`store-${id}`],
    },
  });

  if (!req.ok) {
    const reqError = (await req.json()) as FlyFoodError;
    throw new Error(reqError.error);
  }

  return await req.json();
};
