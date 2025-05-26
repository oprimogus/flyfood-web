import type { Address } from '@/service/flyfood-api/types'
import { create } from 'zustand'

interface AddressState {
  addresses: Address[]
  selectedAddress: Address | undefined
  setSelectedAddress: (address: Address) => void
  setAddresses: (addresses: Address[]) => void
}

export const useAddress = create<AddressState>((set) => ({
  selectedAddress: undefined,
  addresses: [],
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  setAddresses: (addresList: Address[]) => set({ addresses: addresList })
}))
