import type { Customer, Address } from '@/services/flyfood-api/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

interface CustomerStore {
  customer: Ref<Customer | undefined>
  activeAddress: Ref<Address | undefined>
  setCustomer: (newCustomer: Customer) => void
  setActiveAddress: (address: Address) => void
}

export const useCustomerStore = defineStore('customer', (): CustomerStore => {
  const customer: Ref<Customer | undefined> = ref<Customer | undefined>(undefined)
  const activeAddress: Ref<Address | undefined> = ref<Address | undefined>(undefined)

  function setCustomer(newCustomer: Customer): void {
    console.debug('Customer before: ', customer.value)
    console.debug('ActiveAddress before: ', activeAddress.value)
    customer.value = newCustomer
    
    if (!activeAddress.value && newCustomer.addresses.length) {
      setActiveAddress(newCustomer.addresses[0])
    }
    console.debug('Customer after: ', customer.value)
    console.debug('ActiveAddress after: ', activeAddress.value)
  }

  function setActiveAddress(address: Address): void {
    activeAddress.value = address
  }

  return {
    customer,
    activeAddress,
    setCustomer,
    setActiveAddress,
  }
})
