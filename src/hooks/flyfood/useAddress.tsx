import { useCustomer } from './useCustomer'
import type { Address } from '@/service/flyfood-api/types'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useAddress() {
  const queryClient = useQueryClient()
  const { customer } = useCustomer()
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

  useEffect(() => {
    if (!selectedAddress && customer?.addresses?.length) {
      setSelectedAddress(customer.addresses[0])
    }
  }, [customer, selectedAddress])

  useEffect(() => {
    if (selectedAddress) {
      queryClient.invalidateQueries({
        queryKey: ['stores']
      })
    }
  }, [selectedAddress, queryClient])

  return {
    selectedAddress,
    setSelectAddress: setSelectedAddress,
    addresses: customer?.addresses ?? [],
  }
}
