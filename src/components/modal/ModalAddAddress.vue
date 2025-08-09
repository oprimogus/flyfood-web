<script setup lang="ts">
import { ref } from 'vue';
import FormAddAddress from '@/components/form/FormAddAddress.vue';

const modal = ref(null)

// Funções para abrir e fechar o modal
const openModal = () => modal.value?.showModal()
const closeModal = () => modal.value?.close()
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
      <dialog id='modalAddAddress' class='modal' ref="modal">
        <div class='modal-box max-h-[80vh] overflow-y-auto'>
          <h3 class='font-bold text-lg text-center'>
            Adicione seu endereço
          </h3>
          <FormAddAddress closeModal="closeModal" />
        </div>
      </dialog>
  </div>
</template>
