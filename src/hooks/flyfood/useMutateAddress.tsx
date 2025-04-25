import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useCustomer } from './useCustomer'
import type { Address, Customer } from '@/service/flyfood-api/types'
import { flyFoodApi, handleApiError } from '@/service/flyfood-api/service'
import { toast } from 'sonner'
import { useAddress } from './useAddress'

export function useMutateAddress() {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const { customer } = useCustomer()

  // Get the setters directly from the store
  const setSelectedAddress = useAddress((state) => state.setSelectedAddress)
  const setAddresses = useAddress((state) => state.setAddresses)

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
      const previousCustomer = queryClient.getQueryData<Customer | undefined>([
        'customer'
      ])

      if (previousCustomer) {
        const updatedAddresses = [
          ...(previousCustomer.addresses || []),
          newAddress
        ]

        // Update both the query cache and the Zustand store
        queryClient.setQueryData(['customer'], {
          ...previousCustomer,
          addresses: updatedAddresses
        })

        // Update the Zustand store
        setAddresses(updatedAddresses)
      }
      return { previousCustomer }
    },
    onError: (error, _, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(['customer'], context.previousCustomer)
        // Also revert the Zustand store
        setAddresses(context.previousCustomer.addresses || [])
      }
      const apiError = handleApiError(error)
      toast.error('Erro ao adicionar endereço', {
        description: apiError.error || 'Tente novamente mais tarde.'
      })
    },
    onSuccess: (_, address) => {
      // Ensure we refresh the customer data
      queryClient.invalidateQueries({ queryKey: ['customer'] }).then(() => {
        // Update the Zustand store with fresh data from the backend
        const customer = queryClient.getQueryData<Customer>(['customer'])
        if (customer?.addresses) {
          setAddresses(customer.addresses)
        }

        // Set the selected address
        setSelectedAddress(address)
      })

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
      const previousCustomer = queryClient.getQueryData<Customer | undefined>([
        'customer'
      ])

      if (previousCustomer) {
        const updatedAddresses =
          previousCustomer.addresses?.filter(
            (address) => address !== addressToRemove
          ) || []

        // Update both the query cache and the Zustand store
        queryClient.setQueryData(['customer'], {
          ...previousCustomer,
          addresses: updatedAddresses
        })

        // Update the Zustand store
        setAddresses(updatedAddresses)

        // If the removed address was selected, clear the selection
        if (addressToRemove === useAddress.getState().selectedAddress) {
          setSelectedAddress(updatedAddresses[0] || null)
        }
      }

      return { previousCustomer }
    },
    onError: (error, _, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(['customer'], context.previousCustomer)
        // Also revert the Zustand store
        setAddresses(context.previousCustomer.addresses || [])
      }
      const apiError = handleApiError(error)
      toast.error('Erro ao remover endereço', {
        description: apiError.error || 'Tente novamente mais tarde.'
      })
    },
    onSuccess: () => {
      // Ensure we refresh the customer data
      queryClient.invalidateQueries({ queryKey: ['customer'] }).then(() => {
        // Update the Zustand store with fresh data from the backend
        const customer = queryClient.getQueryData<Customer>(['customer'])
        if (customer?.addresses) {
          setAddresses(customer.addresses)
        }
      })

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
