import { ViaCEPApi } from '@/service/viacep/service'
import type { AddressViaCep } from '@/service/viacep/types'
import { useQuery } from '@tanstack/react-query'

export function useViaCEP(cep: string) {
  const { data: addressCEP, isLoading } = useQuery<AddressViaCep | undefined>({
    queryKey: ['viaCEP', cep],
    queryFn: async () => {
      const result = await ViaCEPApi.getInstance().getCEP(cep)
      if (result.ok) {
        return result.value
      }
      return undefined
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!cep && cep.length === 9
  })

  return { addressCEP, isLoading }
}
