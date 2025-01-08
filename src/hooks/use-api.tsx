import { flyFoodApi } from "@/service/flyfood-api/service";
import { Address, GetStoresByFilter } from "@/service/flyfood-api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth"
import { useEffect } from "react";

export function useCustomer(session: Session) {
  const { data, isPending: isCustomerLoading } = useQuery({
    queryKey: ['customer'],
    staleTime: Infinity,
    queryFn: async () => flyFoodApi.getCustomerV1(session),
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
    staleTime: Infinity,
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['addAddress'],
    mutationFn: async (params: Address) => {
      const result = await flyFoodApi.addNewAddressV1(session, params)
      console.log('result: ', result)
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
    },
    onSuccess: () => 
      queryClient.invalidateQueries({
        queryKey: ['customer', 'selectedAddress']
      })
    },
  )

  return { ...mutation }
}

export function useRemoveAddress(session: Session) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['removeAddress'],
    mutationFn: async (params: Address) => {
      const result = await flyFoodApi.removeAddressV1(session, params);
      if (!result.ok) {
        throw new Error(JSON.stringify(result.error))
      }
      return result.value
    },
    onSuccess: () => 
      queryClient.invalidateQueries({
        queryKey: ['customer', 'selectedAddress']
      })
    },
  )

  return { ...mutation }
}

export function useStores(session: Session, params: GetStoresByFilter) {
  const { data: storeList, isError, isLoading } = useQuery({
    queryKey: [`stores-${params.city || 'default-city'}`],
    queryFn: async () => {
      return flyFoodApi.getStoreByFilterV1(session, params)
    },
    staleTime: 1 * 1000 * 60,
    enabled: Boolean(params.city),
  });

  return { storeList, isError, isLoading };
}