import { env } from '@/config/env'
import { type Result, fetchApi } from '../../utils/http'
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

  async getCEP(cep: string): Promise<Result<AddressViaCep, unknown>> {
    return await fetchApi<AddressViaCep>(
      this.baseURL,
      `/ws/${cep}/json/`,
      {
        method: 'GET'
      }
    )
  }
}

export const viaCepApi = ViaCEPApi.getInstance()
