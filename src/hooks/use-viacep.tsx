import { getCEP } from '@/service/viacep/service'
import type { AddressViaCep } from '@/service/viacep/types'
import { useQuery } from '@tanstack/react-query'

export function useViaCEP(cep: string) {
  const {
    data: addressCEP,
    isLoading,
    isError
  } = useQuery<AddressViaCep | undefined>({
    queryKey: ['viaCEP', cep],
    queryFn: () => getCEP(cep),
    staleTime: 1000 * 60 * 60,
    enabled: !!cep && cep.length === 9
  })

  return { addressCEP, isLoading, isError }
}
