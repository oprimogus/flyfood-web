import { useMutateAddress } from '@/hooks/flyfood/useMutateAddress'
import type { Address } from '@/service/flyfood-api/types'
import { XIcon } from 'lucide-react'
import React, { useRef } from 'react'

type Props = {
  addr: Address
}

export default function ModalDeleteAddress({ addr }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const { removeAddressMutation } = useMutateAddress()
  const openModal = () => modalRef.current?.showModal()
  const closeModal = () => modalRef.current?.close()

  const handleDelete = async () => {
    await removeAddressMutation.mutateAsync(addr)
    closeModal()
  }

  return (
    <div>
      {/* Botão para abrir modal */}
      <button
        type='button'
        onClick={() => openModal()}
        className='absolute top-2 right-2 btn btn-ghost p-0 text-xl z-30'
      >
        <XIcon />
      </button>
      {/* Modal */}
      <dialog ref={modalRef} className='modal'>
        <div className='modal-box justify-items-center max-w-screen-[70vh] overflow-y-auto space-y-2'>
          <form method='dialog'>
            <button
              type='button'
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >
              ✕
            </button>
          </form>
          <h3 id='modal-title' className='font-bold text-lg text-center'>
            Realmente deseja excluir este endereço?
          </h3>
          <div className='flex flex-row space-x-16 pt-4'>
            {removeAddressMutation.isPending && (
              <span className='loading loading-spinner loading-xs' />
            )}
            {!removeAddressMutation.isPending && (
              <>
                <button
                  type='button'
                  className='btn btn-secondary w-24'
                  onClick={() => closeModal()}
                >
                  Não
                </button>
                <button
                  type='button'
                  className='btn btn-primary w-24'
                  onClick={() => handleDelete()}
                >
                  Sim
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  )
}
