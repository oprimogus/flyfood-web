import { useSession } from '@/hooks/useSession'
import { useCustomer } from '@/hooks/useCustomer'
import { ref, watch, type Ref } from 'vue'
import type { GetStoresByFilterInput } from '@/services/flyfood-api/types'
import { useQuery } from '@tanstack/vue-query'
import { flyFoodApi } from '@/services/flyfood-api/service'

export function useStores() {
  const { accessToken, isAuthenticated } = useSession()
  const { activeAddress } = useCustomer()
  const queryParams: Ref<GetStoresByFilterInput> = ref<GetStoresByFilterInput>({
    city: activeAddress?.city ?? '',
    page: 1,
    maxItems: 10,
  })

  async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const {
    data: storeList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['stores', queryParams], // Evita reexecuções desnecessárias
    queryFn: async () => {
      const d = delay(2000)
      const result = await flyFoodApi.getStoreByFilterV1(accessToken.value, queryParams.value)
      await d
      return result
    },
    enabled: !!isAuthenticated && !!queryParams.value.city && queryParams.value.city !== '',
  })

  watch(
    () => activeAddress?.city,
    (newCity) => {
      queryParams.value.city = newCity ?? ''
    },
  )

  return {
    storeList,
    isLoading,
    refetch,
    queryParams,
  }
}
