'use client'
import { useAddress } from '@/hooks/flyfood/useAddress'
import React, { useEffect, useRef } from 'react'
import ModalAddAddress from './modal-add-address'
import ModalDeleteAddress from './modal-delete-address'

export default function ModalAddress() {
  const selectedAddress = useAddress((state) => state.selectedAddress)
  const addresses = useAddress((state) => state.addresses)
  const setSelectedAddress = useAddress((state) => state.setSelectedAddress)

  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = () => modalRef.current?.showModal()
  const closeModal = () => modalRef.current?.close()

  const displayedAddress = selectedAddress
    ? selectedAddress.addressLine1
    : (addresses?.[0]?.addressLine1 ?? 'Adicionar endereço')

  useEffect(() => {}, [])

  return (
    <div>
      {/* Botão para abrir modal */}
      <button className='btn' type='button' onClick={openModal}>
        {displayedAddress ?? 'Carregando...'}
      </button>

      {/* Modal */}
      <dialog ref={modalRef} className='modal'>
        <div className='modal-box justify-items-center max-w-screen-[70vh] overflow-y-auto'>
          <form method='dialog'>
            <button
              type='submit'
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >
              ✕
            </button>
          </form>
          <h3 id='modal-title' className='font-bold text-lg text-center'>
            Selecionar Endereço
          </h3>

          {/* Verifica erro ou lista os endereços */}
          {/* {isLoading && <p className='py-4'>Carregando endereços...</p>} */}

          {addresses?.length ? (
            <ul className='py-4'>
              {addresses.map((address) => (
                <li
                  key={address.name}
                  className='relative border-b py-2 text-center h-32'
                >
                  <ModalDeleteAddress addr={address} />
                  <button
                    type='button'
                    onClick={() => {
                      setSelectedAddress(address)
                      closeModal()
                    }}
                    className='btn card bg-base-200 w-full h-full'
                  >
                    <h2 className='card-title'>{address.name}</h2>
                    <p>
                      {address.addressLine1}, {address.addressLine2}
                    </p>
                    <p>
                      {address.neighborhood}, {address.city} - {address.state}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-500 py-4 text-center'>
              Nenhum endereço cadastrado.
            </p>
          )}
          <ModalAddAddress />
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button type='submit'>Fechar</button>
        </form>
      </dialog>
    </div>
  )
}
