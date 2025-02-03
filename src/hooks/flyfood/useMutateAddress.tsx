import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useCustomer } from './useCustomer'
import type {
  Address,
  Customer,
  FlyFoodError
} from '@/service/flyfood-api/types'
import { flyFoodApi, handleApiError } from '@/service/flyfood-api/service'
import type { Result } from '@/service/http'
import { toast } from 'sonner'
import { useAddress } from './useAddress'

export function useMutateAddress() {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const { customer } = useCustomer()
  const { setSelectAddress } = useAddress()

  const addAddressMutation = useMutation({
    mutationKey: ['addAddress', customer?.id],
    mutationFn: async (param: Address) => {
      if (!session) {
        throw new Error('Usuário não logado')
      }
      const result = await flyFoodApi.addNewAddressV1(session, param)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
    },
    onMutate: async (newAddress) => {
      await queryClient.cancelQueries({ queryKey: ['customer'] })
      const previousCustomer = queryClient.getQueryData<Customer | undefined>(['customer'])

      if (previousCustomer) {
        queryClient.setQueryData(['customer'], {
          ...previousCustomer,
          addresses: [...(previousCustomer.addresses || []), newAddress]
        })
      }
      return { previousCustomer }
    },
    onError: (error, _, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(['customer'], context.previousCustomer)
      }
      const apiError = handleApiError(error)
      toast.error('Erro ao adicionar endereço', {
        description: apiError.error || 'Tente novamente mais tarde.'
      })
    },
    onSuccess: (_, address) => {
      setSelectAddress(address)
      toast.success('Endereço adicionado!', {
        description: 'Seu endereço foi salvo com sucesso.'
      })
    }
  })

  const removeAddressMutation = useMutation({
    mutationKey: ['removeAddress', customer?.id],
    mutationFn: async (param: Address) => {
      if (!session) {
        throw new Error('Usuário não logado')
      }
      const result = await flyFoodApi.removeAddressV1(session, param)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
    },
    onMutate: async (addressToRemove) => {
      await queryClient.cancelQueries({ queryKey: ['customer'] })
      const previousCustomer = queryClient.getQueryData<Customer | undefined>(['customer'])

      if (previousCustomer) {
        const updatedAddresses = previousCustomer.addresses?.filter(
          (address) => address !== addressToRemove
        ) || []

        queryClient.setQueryData(['customer'], {
          ...previousCustomer,
          addresses: updatedAddresses
        })
      }

      return { previousCustomer }
    },
    onError: (error, _, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(['customer'], context.previousCustomer)
      }
      const apiError = handleApiError(error)
      toast.error('Erro ao remover endereço', {
        description: apiError.error || 'Tente novamente mais tarde.'
      })
    },
    onSuccess: (_, removedAddress) => {
      toast.success('Endereço removido!', {
        description: 'Seu endereço foi removido com sucesso.'
      })
    }
  })

  return {
    addAddressMutation,
    removeAddressMutation
  }
}
