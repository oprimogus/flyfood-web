import { getCustomerV1, getStoreByFilterV1 } from "@/service/flyfood-api/service";
import { Address, GetStoresByFilter, QueryStore } from "@/service/flyfood-api/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export function useCustomer(session: Session) {
  const { data: customer } = useQuery({
    queryKey: ['customer'],
    staleTime: Infinity,
    queryFn: () => getCustomerV1(session),
    enabled: !!session.user,
  })

  return { customer }
}

export function useSelectedAddress() {
  const queryClient = useQueryClient()
  const setSelectedAddress = (newAddress: Address | undefined) => {
    queryClient.setQueryData<Address>(['selectedAddress'], newAddress)
  }

  const { data: selectedAddress } = useQuery<Address | undefined>({
    queryKey: ['selectedAddress'],
    staleTime: Infinity,
    enabled: false,
  })

  return { selectedAddress, setSelectedAddress }
}

export function useStores(params: GetStoresByFilter) {
  const { data: session } = useSession()
  const { data: storeList, isError, isLoading } = useQuery<QueryStore[]>({
    queryKey: [`stores-${params.city || 'default-city'}`],
    queryFn: async () => {
      return getStoreByFilterV1(params, session?.user.accessToken as string);
    },
    staleTime: 0, // Opcional: garante que os dados não sejam reutilizados do cache
    enabled: Boolean(params.city), // Verifica se params.city está definido
  });

  return { storeList, isError, isLoading };
}