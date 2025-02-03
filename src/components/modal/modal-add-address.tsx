'use client'
import React, { useRef } from 'react'
import FormAddAddress from '../form/form-add-address'

export default function ModalAddAddress() {
  const modalRef = useRef<HTMLDialogElement>(null)

  // Funções para abrir e fechar o modal
  const openModal = () => modalRef.current?.showModal()
  const closeModal = () => modalRef.current?.close()

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        type='button'
        className='btn btn-primary'
        onClick={() => openModal()}
      >
        Adicionar novo endereço
      </button>
      <dialog id='my_modal_1' className='modal' ref={modalRef}>
        <div className='modal-box max-h-[80vh] overflow-y-auto'>
          <h3 className='font-bold text-lg text-center'>
            Adicione seu endereço
          </h3>
          <FormAddAddress closeModal={closeModal} />
        </div>
      </dialog>
    </>
  )
}
