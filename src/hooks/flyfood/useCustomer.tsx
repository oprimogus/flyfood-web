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

  // const { selectedAddress, addresses, setAddresses, setSelectedAddress } = useAddress()
  const selectedAddress = useAddress((state) => state.selectedAddress)
  const setAddresses = useAddress((state) => state.setAddresses)
  const setSelectedAddress = useAddress((state) => state.setSelectedAddress)

  useEffect(() => {
    if (customer && customer.addresses.length > 0) {
      setAddresses(customer.addresses) // Garante que o estado será atualizado
  
      if (!selectedAddress) {
        setSelectedAddress(customer.addresses[0])
      }
    }
  }, [customer, setAddresses, setSelectedAddress]) // Adicione as funções de atualização como dependências

  return { customer, isLoading }
}
