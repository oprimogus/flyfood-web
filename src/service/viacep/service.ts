import { env } from "@/config/env";
import { AddressViaCep } from "./types";

const client = {
  baseURL: env.clients.viacep.baseURL
}

export const getCEP = async(cep: string): Promise<AddressViaCep> => {
  const req = await fetch(`${client.baseURL}/ws/${cep}/json/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if (!req.ok) {
    const errorData = await req.json()
    throw new Error(
      `Error fetching viacep data: ${JSON.stringify(errorData)}`
    )
  }

  return await req.json()
}