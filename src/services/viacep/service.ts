import { env } from '@/config/env'
import type { AddressViaCep } from './types'

export class ViaCEPApi {
  private static instance: ViaCEPApi
  private readonly baseURL = env.clients.viacep.baseURL

  private constructor() {}

  public static getInstance(): ViaCEPApi {
    if (!ViaCEPApi.instance) {
      ViaCEPApi.instance = new ViaCEPApi()
    }

    return ViaCEPApi.instance
  }

  async getCEP(cep: string): Promise<AddressViaCep> {
      const response = await fetch(this.baseURL + `/ws/${cep}/json/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      const responseBody = await response.json()
      if (!response.ok) {
        throw new Error('Falha com ViaCEP')
      }
      return responseBody as AddressViaCep
  }
}

export const viaCepApi = ViaCEPApi.getInstance()
