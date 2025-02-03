'use client'
import { useAddress } from '@/hooks/flyfood/useAddress'
import React, { useRef } from 'react'
import ModalAddAddress from './modal-add-address'
import ModalDeleteAddress from './modal-delete-address'

export default function ModalAddress() {
  const { 
    selectedAddress, 
    addresses, 
    customerLoading, 
    setSelectAddress } = useAddress()
  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = () => modalRef.current?.showModal()

  const displayedAddress = selectedAddress
    ? selectedAddress.addressLine1
    : (addresses?.[0]?.addressLine1 ?? 'Adicionar endereço')

  return (
    <div>
      {/* Botão para abrir modal */}
      <button
        className='btn'
        type='button'
        onClick={openModal}
        disabled={customerLoading}
      >
        {customerLoading ? 'Carregando...' : displayedAddress}
      </button>

      {/* Modal */}
      <dialog
        ref={modalRef}
        className='modal'
        aria-labelledby='modal-title'
        aria-hidden='true'
      >
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
          {customerLoading && <p className='py-4'>Carregando endereços...</p>}

          {!customerLoading && addresses?.length ? (
            <ul className='py-4'>
              {addresses.map((address, i) => (
                <li
                  key={address.name}
                  className='relative border-b py-2 text-center h-32'
                >
                  <ModalDeleteAddress addr={address} />
                  <button
                    type='button'
                    onClick={() => setSelectAddress(address)}
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
