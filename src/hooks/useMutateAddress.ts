import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useSession } from './useSession'
import { flyFoodApi } from '@/services/flyfood-api/service'
import type { Address } from '@/services/flyfood-api/types'
import { useCustomer } from './useCustomer'
import { POSITION, useToast } from 'vue-toastification'
import { FlyFoodException } from '@/services/flyfood-api'

export function useMutateAddress() {
  const { accessToken } = useSession()
  const toast = useToast()
  const queryClient = useQueryClient()

  const addAddressMutation = useMutation({
    mutationFn: async (params: Address) => {
      return await flyFoodApi.addNewAddressV1(accessToken.value, params)
    },
    onMutate: async (newAddress) => {
      await queryClient.invalidateQueries({ queryKey: ['customer'] })
    },
    onError: (error, variables, context) => {
      if (error instanceof FlyFoodException) {
        toast.error(error.error?.error)
      } else {
        toast.error('Ocorreu um erro interno ao adicionar novo endereço.')
      }
    },
    onSuccess: (data) => {
      toast.success('Endereço adicionado com sucesso')
    },
  })

  return { addAddressMutation }
}
