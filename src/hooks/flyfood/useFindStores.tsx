import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { flyFoodApi } from '@/service/flyfood-api/service'
import type { GetStoresByFilterInput } from '@/service/flyfood-api/types'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { useAddress } from '@/hooks/flyfood/useAddress'

export function useFindStores() {
  const { data: session } = useSession()
  const { selectedAddress } = useAddress()
  const [queryParams, setQueryParams] = useState<GetStoresByFilterInput>({
    city: selectedAddress?.city ?? '',
    maxItems: 25,
    page: 1
  })

  const { data: storeList, isLoading, refetch } = useQuery({
    queryKey: ['stores', queryParams], // Evita reexecuções desnecessárias
    queryFn: async () => {
      console.log('input: ', queryParams)
      console.log('session: ', session)
      const result = await flyFoodApi.getStoreByFilterV1(session as Session, queryParams)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
      console.log('storelist: ', result.value)
      return result.value
    },
    enabled: !!session && !!queryParams.city && queryParams.city !== ''
  })

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      city: selectedAddress?.city ?? ''
    }))
  }, [selectedAddress])

  return { storeList, isLoading, refetch, queryParams, setQueryParams }
}
