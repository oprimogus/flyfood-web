import { flyFoodApi } from '@/service/flyfood-api/service'
import { useQuery } from '@tanstack/react-query'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useAddress } from './useAddress'

export function useCustomer() {
  const { data: session } = useSession()
  const { data: customer, isPending: isLoading } = useQuery({
    queryKey: ['customer'],
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!session,
    queryFn: async () => {
      const result = await flyFoodApi.getCustomerV1(session as Session)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
      return result.value
    }
  })

  const { selectedAddress, addresses, setAddresses, setSelectedAddress } = useAddress()

  useEffect(() => {
    if (customer) {
      if (!addresses) {
        setAddresses(customer.addresses)
      }

      if (!selectedAddress) {
        setSelectedAddress(customer.addresses[0])
      }
    }
  }, [customer, selectedAddress])

  return { customer, isLoading }
}
