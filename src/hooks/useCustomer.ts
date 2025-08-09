import { useQuery } from '@tanstack/vue-query'
import { useSession } from './useSession'
import { flyFoodApi } from '@/services/flyfood-api/service'
import { useCustomerStore } from '@/stores/customer'
import { watch } from 'vue'

export function useCustomer() {
  const { isAuthenticated, accessToken } = useSession()
  const { customer, activeAddress, setActiveAddress, setCustomer } = useCustomerStore()

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['customer'],
    enabled: isAuthenticated.value,
    queryFn: async () => {
      return await flyFoodApi.getCustomerV1(accessToken.value)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })

  watch(
      () => data.value,
    (newData) => {
      if (newData) {
        setCustomer(newData)
      }
    },
    {
      immediate: true,
    },
  )

  return {
    customer,
    setCustomer,
    activeAddress,
    setActiveAddress,
    error,
    isError,
    isLoading,
  }
}
