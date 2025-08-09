<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCustomer } from '@/hooks/useCustomer'
import type { Address } from '@/services/flyfood-api/types'
import ModalAddAddress from '@/components/modal/ModalAddAddress.vue'

const modalRef = ref<HTMLDialogElement | null>(null)

const { activeAddress, setActiveAddress, customer } = useCustomer()

const openModal = () => modalRef.value?.showModal()
const closeModal = () => modalRef.value?.close()

const displayedAddress =
  activeAddress?.addressLine1 ?? customer?.addresses?.[0]?.addressLine1 ?? 'Adicionar endereço'

const selectAddress = (address: Address) => {
  setActiveAddress(address)
  closeModal()
}
</script>

<template>
  <div>
    <!-- Botão para abrir modal -->
    <button class="btn" type="button" @click="openModal">
      {{ displayedAddress }}
    </button>

    <!-- Modal -->
    <dialog ref="modalRef" class="modal">
      <div class="modal-box justify-items-center max-w-screen-[70vh] overflow-y-auto">
        <form method="dialog">
          <button type="submit" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 id="modal-title" class="font-bold text-lg text-center">Selecionar Endereço</h3>

        <ul v-if="customer?.addresses.length" class="py-4">
          <li
            v-for="address in customer.addresses"
            :key="address.name"
            class="relative border-b py-2 text-center h-32">
            <ModalDeleteAddress :addr="address" />
            <button
              type="button"
              @click="selectAddress(address)"
              class="btn card bg-base-200 w-full h-full">
              <h2 class="card-title">{{ address.name }}</h2>
              <p>{{ address.addressLine1 }}, {{ address.addressLine2 }}</p>
              <p>{{ address.neighborhood }}, {{ address.city }} - {{ address.state }}</p>
            </button>
          </li>
        </ul>
        <p v-else class="text-gray-500 py-4 text-center">Nenhum endereço cadastrado.</p>

        <ModalAddAddress />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button type="submit">Fechar</button>
      </form>
    </dialog>
  </div>
</template>
