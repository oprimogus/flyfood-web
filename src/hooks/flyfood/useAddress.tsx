import type { Address } from '@/service/flyfood-api/types'
import { create } from 'zustand'


interface AddressStore {
  selectedAddress: Address | undefined
  addresses: Address[] | undefined
  setSelectedAddress: (address: Address) => void
  setAddresses: (addresses: Address[]) => void
}

export const useAddress = create<AddressStore>((set) => ({
  selectedAddress: undefined,
  addresses: undefined,
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  setAddresses: (addresses: Address[]) => set({ addresses: addresses })
}))
