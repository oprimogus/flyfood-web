<script setup lang="ts">
import { nextTick, ref } from 'vue';
import FormAddAddress from '@/components/form/FormAddAddress.vue';

const modalRef = ref<HTMLDialogElement | null>(null)
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  nextTick(() => modalRef.value?.showModal())
}

const closeModal = () => {
  modalRef.value?.close()
  isModalOpen.value = false
}

</script>

<template>
  <div>
      <!-- Open the modal using document.getElementById('ID').showModal() method -->
      <button
        type='button'
        class='btn btn-primary btn-md w-full'
        @click="openModal()"
      >
        Adicionar novo endereço
      </button>
      <dialog id='modalAddAddress' v-if="isModalOpen" class='modal' ref="modal">
        <div class='modal-box max-h-[80vh] overflow-y-auto'>
          <h3 class='font-bold text-lg text-center'>
            Adicione seu endereço
          </h3>
          <FormAddAddress :closeModal="closeModal" />
        </div>
      </dialog>
  </div>
</template>
