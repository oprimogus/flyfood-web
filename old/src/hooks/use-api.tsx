import { flyFoodApi } from '@/service/flyfood-api/service'
import type {
  Address,
  Customer,
  FlyFoodError,
  GetStoresByFilterInput,
  QueryOwnerStoreList,
} from '@/service/flyfood-api/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Result } from '@/utils/http'
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

// ✅ `session` agora é obtida dentro do hook
export function useCustomer() {
  const { data: session } = useSession()
  const { data, isPending: isCustomerLoading } = useQuery({
    queryKey: ['customer'],
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!session,
    queryFn: async () => flyFoodApi.getCustomerV1(session!)
  })
  return { data, isCustomerLoading }
}

// ✅ `session` dentro do hook e melhor uso do `useEffect`
export function useAddress() {
  const queryClient = useQueryClient()
  const { data: customer } = useCustomer()

  const setSelectedAddress = (newAddress: Address | undefined) => {
    queryClient.setQueryData<Address>(['selectedAddress'], newAddress)
  }

  const { data: selectedAddress } = useQuery<Address | undefined>({
    queryKey: ['selectedAddress'],
    staleTime: Number.POSITIVE_INFINITY
  })

  const addresses = customer?.ok ? customer.value.addresses : []

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      setSelectedAddress(addresses[0])
    } 
  }, [addresses.length, selectedAddress, setSelectedAddress])

  return { addresses, selectedAddress, setSelectedAddress }
}

export function useAddAddress() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data: session } = useSession()

  const mutation = useMutation({
    mutationKey: ['addAddress'],
    mutationFn: async (params: Address) => {
      if (!session) throw new Error('Usuário não autenticado')
      const result = await flyFoodApi.addNewAddressV1(session, params)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
      return params
    },
    onMutate: async (newAddress) => {
      await queryClient.cancelQueries({ queryKey: ['customer'] })
      const previousCustomer = queryClient.getQueryData<Result<Customer, FlyFoodError>>(['customer'])

      if (previousCustomer?.ok) {
        queryClient.setQueryData(['customer'], {
          ...previousCustomer,
          value: { ...previousCustomer.value, addresses: [...previousCustomer.value.addresses, newAddress] }
        })
      }
      return { previousCustomer }
    },
    onError: (error, _, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(['customer'], context.previousCustomer)
      }
      const apiError = handleApiError(error)
      toast({
        title: 'Erro ao adicionar endereço',
        description: apiError.error || 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({ title: 'Endereço adicionado!', description: 'Seu endereço foi salvo com sucesso.' })
    }
  })

  return mutation
}

export function useRemoveAddress() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data: session } = useSession()

  const mutation = useMutation({
    mutationKey: ['removeAddress'],
    mutationFn: async (params: Address) => {
      if (!session) throw new Error('Usuário não autenticado')
      const result = await flyFoodApi.removeAddressV1(session, params)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
      return params
    },
    onMutate: async (addressToRemove) => {
      await queryClient.cancelQueries({ queryKey: ['customer'] })
      const previousCustomer = queryClient.getQueryData<Result<Customer, FlyFoodError>>(['customer'])

      if (previousCustomer?.ok && previousCustomer.value) {
        queryClient.setQueryData(['customer'], (old: Result<Customer, FlyFoodError> | undefined) => {
          if (!old?.ok || !old.value) return previousCustomer
          return {
            ...old,
            value: {
              ...old.value,
              addresses: old.value.addresses.filter(addr => addr !== addressToRemove)
            }
          }
        })

        const selectedAddress = queryClient.getQueryData<Address>(['selectedAddress'])
        if (selectedAddress === addressToRemove) {
          const remainingAddresses = previousCustomer.value.addresses.filter(
            addr => addr !== addressToRemove
          )
          queryClient.setQueryData(['selectedAddress'], remainingAddresses[0])
        }
      }

      return { previousCustomer }
    },
    onError: (error, _, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(['customer'], context.previousCustomer)
      }
      const apiError = handleApiError(error)
      toast({
        title: 'Erro ao remover endereço',
        description: apiError.error || 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({ title: 'Endereço removido!', description: 'O endereço foi excluído com sucesso.' })
      queryClient.invalidateQueries({ queryKey: ['customer'] })
      queryClient.invalidateQueries({ queryKey: ['selectedAddress'] })
    }
  })

  return mutation
}


// ✅ `session` dentro do hook e `enabled` para evitar chamadas erradas
export function useStoreList(params: GetStoresByFilterInput) {
  const { data: session } = useSession()
  const {
    data: storeList,
    isError,
    isLoading,
    refetch
  } = useQuery({
    queryKey: [`stores-${params.city || 'default-city'}`],
    queryFn: async () => flyFoodApi.getStoreByFilterV1(session!, params),
    staleTime: 60 * 1000,
    enabled: !!session && !!params.city
  })

  return { storeList, isError, isLoading, refetch }
}

// ✅ `session` dentro do hook e `enabled`
export function useOwnerStores() {
  const { data: session } = useSession()
  const {
    data: storeList,
    isError,
    isLoading,
    refetch
  } = useQuery({
    queryKey: [`owner-stores`],
    queryFn: async () => flyFoodApi.getOwnerStoresV1(session!),
    staleTime: 60 * 1000,
    enabled: !!session
  })

  return { storeList, isError, isLoading, refetch }
}

// ✅ `session` dentro do hook e `enabled`
export function useQueryOwnerStore(id: string) {
  const { data: session } = useSession()
  const {
    data: store,
    isError,
    isLoading,
    refetch
  } = useQuery({
    queryKey: [`owner-store-${id}`],
    queryFn: async () => flyFoodApi.getOwnerStoreByIDV1(session!, id),
    staleTime: 60 * 1000,
    enabled: !!session
  })

  return { store, isError, isLoading, refetch }
}

// ✅ `session` dentro do hook e `useEffect` otimizado
export function useStore() {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const { data: selectedStore } = useQuery<QueryOwnerStoreList | undefined>({
    queryKey: ['selectedStore'],
    staleTime: Number.POSITIVE_INFINITY
  })

  const stores = useOwnerStores()

  const setSelectedStore = (st: QueryOwnerStoreList | undefined) => {
    queryClient.setQueryData<QueryOwnerStoreList>(['selectedStore'], st)
  }

  useEffect(() => {
    if (!selectedStore && stores?.storeList?.ok && stores.storeList.value.length > 0) {
      setSelectedStore(stores.storeList.value[0])
    }
  }, [stores?.storeList?.ok, selectedStore])

  return { selectedStore, setSelectedStore }
}
