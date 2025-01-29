import { flyFoodApi } from '@/service/flyfood-api/service'
import type {
  Address,
  Customer,
  FlyFoodError,
  GetStoresByFilter
} from '@/service/flyfood-api/types'
import type { Result } from '@/service/http'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Session } from 'next-auth'
import { useEffect } from 'react'
import { useToast } from './use-toast'

function handleApiError(error: unknown): FlyFoodError {
  try {
    if (error instanceof Error) {
      return JSON.parse(error.message) as FlyFoodError
    }
    return {
      message: 'Ocorreu um erro inesperado',
      error: 'Ocorreu um erro inesperado',
      details: [],
      code: '500',
      traceID: 'unknown',
    }
  } catch {
    return {
      message: 'Ocorreu um erro inesperado',
      error: 'Ocorreu um erro inesperado',
      details: [],
      code: '500',
      traceID: 'unknown',
    }
  }
}

export function useCustomer(session: Session) {
  const { data, isPending: isCustomerLoading } = useQuery({
    queryKey: ['customer'],
    staleTime: Number.POSITIVE_INFINITY,
    queryFn: async () => flyFoodApi.getCustomerV1(session)
  })
  return { data, isCustomerLoading }
}

export function useAddress(session: Session) {
  const queryClient = useQueryClient()

  const setSelectedAddress = (newAddress: Address | undefined) => {
    queryClient.setQueryData<Address>(['selectedAddress'], newAddress)
  }

  const { data: customer } = useCustomer(session)

  const { data: selectedAddress } = useQuery<Address | undefined>({
    queryKey: ['selectedAddress'],
    staleTime: Number.POSITIVE_INFINITY
  })

  const addresses = customer?.ok ? customer.value.addresses : []

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      setSelectedAddress(addresses[0])
    } 
  }, [addresses, selectedAddress])
  return { addresses, selectedAddress, setSelectedAddress }
}

export function useAddAddress(session: Session) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationKey: ['addAddress'],
    mutationFn: async (params: Address) => {
      const result = await flyFoodApi.addNewAddressV1(session, params)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
      return params
    },
    onMutate: async (newAddress) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['customer'] })

      // Snapshot the previous value
      const previousCustomer = queryClient.getQueryData<Result<Customer, FlyFoodError>>(['customer'])

      // Optimistically update customer data
      if (previousCustomer?.ok) {
        queryClient.setQueryData<Result<Customer, FlyFoodError>>(['customer'], old => {
          if (!old?.ok) return previousCustomer
          return {
            ...old,
            value: {
              ...old.value,
              addresses: [...old.value.addresses, newAddress]
            }
          }
        })
      }

      return { previousCustomer }
    },
    onError: (error, variables, context) => {
      // Rollback to the previous value
      if (context?.previousCustomer) {
        queryClient.setQueryData(['customer'], context.previousCustomer)
      }

      // Handle and display error
      const apiError = handleApiError(error)
      toast({
        title: 'Erro ao adicionar endereço',
        description: apiError.error || 'Não foi possível adicionar o endereço. Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
    onSuccess: (params) => {
      toast({
        title: 'Endereço adicionado!',
        description: 'O seu novo endereço foi adicionado com sucesso.',
      })

      // Ensure the customer data is up to date
      queryClient.invalidateQueries({
        queryKey: ['customer']
      })
      queryClient.invalidateQueries({
        queryKey: ['selectedAddress']
      })
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: ['selectedAddress']
      })
    }
  })

  return { ...mutation }
}

export function useRemoveAddress(session: Session) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationKey: ['removeAddress'],
    mutationFn: async (params: Address) => {
      const result = await flyFoodApi.removeAddressV1(session, params)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
      return params
    },
    onMutate: async (addressToRemove) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['customer'] })

      // Snapshot the previous value
      const previousCustomer = queryClient.getQueryData<Result<Customer, FlyFoodError>>(['customer'])

      // Optimistically update customer data
      if (previousCustomer?.ok) {
        queryClient.setQueryData<Result<Customer, FlyFoodError>>(['customer'], old => {
          if (!old?.ok) return previousCustomer
          return {
            ...old,
            value: {
              ...old.value,
              addresses: old.value.addresses.filter(addr => addr !== addressToRemove)
            }
          }
        })

        // Also update selected address if it was the one removed
        const selectedAddress = queryClient.getQueryData<Address>(['selectedAddress'])
        if (selectedAddress === addressToRemove) {
          const remainingAddresses = previousCustomer.value.addresses.filter(
            addr => addr !== addressToRemove
          )
          queryClient.setQueryData<Address | undefined>(
            ['selectedAddress'],
            remainingAddresses[0]
          )
        }
      }

      return { previousCustomer }
    },
    onError: (error, variables, context) => {
      // Rollback to the previous value
      if (context?.previousCustomer) {
        queryClient.setQueryData(['customer'], context.previousCustomer)
      }

      // Handle and display error
      const apiError = handleApiError(error)
      toast({
        title: 'Erro ao remover endereço',
        description: apiError.error || 'Não foi possível remover o endereço. Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
    onSuccess: (params) => {
      toast({
        title: 'Endereço removido!',
        description: 'O endereço foi removido com sucesso.',
      })

      // Ensure the customer data is up to date
      queryClient.invalidateQueries({
        queryKey: ['customer']
      })
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: ['selectedAddress']
      })
    }
  })

  return { ...mutation }
}

export function useStores(session: Session, params: GetStoresByFilter) {
  const {
    data: storeList,
    isError,
    isLoading,
    refetch
  } = useQuery({
    queryKey: [`stores-${params.city || 'default-city'}`],
    queryFn: async () => {
      return flyFoodApi.getStoreByFilterV1(session, params)
    },
    staleTime: 1 * 1000 * 60,
    enabled: Boolean(params.city)
  })

  return { storeList, isError, isLoading, refetch }
}

export function useOwnerStores(session: Session) {
  const {
    data: storeList,
    isError,
    isLoading,
    refetch
  } = useQuery({
    queryKey: [`owner-stores`],
    queryFn: async () => {
      return flyFoodApi.getOwnerStoresV1(session)
    },
    staleTime: 1 * 1000 * 60,
  })

  return { storeList, isError, isLoading, refetch }
}