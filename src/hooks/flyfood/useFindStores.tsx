import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useAddress } from './useAddress'
import { flyFoodApi } from '@/service/flyfood-api/service'
import type { GetStoresByFilterInput } from '@/service/flyfood-api/types'
import { Session } from 'next-auth'

export function useFindStores(params: GetStoresByFilterInput) {
  const { data: session } = useSession()
  const { selectedAddress } = useAddress()

  const queryParams = {
    ...params,
    city: selectedAddress?.city ?? '' // Sobrescreve o city do params com o do selectedAddress
  }

  console.log(queryParams)

  const { data: storeList, isLoading } = useQuery({
    queryKey: ['stores', queryParams],
    queryFn: async () => {
      const result = await flyFoodApi.getStoreByFilterV1(session as Session, queryParams)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
      return result.value
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!session && !!selectedAddress
  })

  return { storeList, isLoading }
}
