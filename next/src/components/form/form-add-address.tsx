'use client'
import { useMutateAddress } from '@/hooks/flyfood/useMutateAddress'
import { useViaCEP } from '@/hooks/useViaCEP'
import type { Address } from '@/service/flyfood-api/types'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  closeModal: () => void
}

export default function FormAddAddress({ closeModal }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Address>({
    mode: 'onChange'
  })

  const postalCode = watch('postalCode')
  const { addAddressMutation } = useMutateAddress()
  const { addressCEP, isLoading } = useViaCEP(postalCode)

  const handleGetCEP = async () => {
    if (addressCEP) {
      setValue('addressLine1', addressCEP.logradouro || '')
      setValue('neighborhood', addressCEP.bairro || '')
      setValue('city', addressCEP.localidade || '')
      setValue('state', addressCEP.uf || '')
      setValue('country', 'Brasil')
    }
  }

  const handleAddAddress = async (addr: Address) => {
    clearErrors()
    await addAddressMutation.mutateAsync(addr)
    reset()
    closeModal()
  }

  useEffect(() => {
    if (addAddressMutation.isSuccess) {
      reset()
      closeModal()
    }
  }, [addAddressMutation.isSuccess, closeModal, reset])

  return (
    <form
      onSubmit={handleSubmit(handleAddAddress)}
      className='form-control space-y-8'
    >
      {/* CEP */}
      <div className='flex flex-col'>
        <label htmlFor='postalCode'>CEP</label>
        <div className='flex flex-row space-x-4'>
          <input
            id='postalCode'
            {...register('postalCode', {
              required: 'Este campo é obrigatório',
              pattern: {
                value: /^\d{5}-\d{3}$/,
                message: 'CEP inválido'
              }
            })}
            placeholder='00000-000'
            className='input input-bordered input-primary w-1/2'
          />
          <button
            type='button'
            onClick={handleGetCEP}
            disabled={isLoading}
            className='btn btn-primary'
          >
            {isLoading ? 'Buscando...' : 'Buscar CEP'}
          </button>
        </div>

        {errors.postalCode && (
          <p className='text-primary text-sm mt-1'>
            {errors.postalCode.message}
          </p>
        )}
      </div>

      {/* Name */}
      <div className='flex flex-col'>
        <label htmlFor='addressName'>Nome do Endereço</label>
        <input
          id='address_name'
          {...register('name', {
            required: 'Este campo é obrigatório'
          })}
          placeholder='Minha Casa'
          className='input input-bordered input-primary'
        />
        {errors.name && (
          <p className='text-primary text-sm mt-1'>{errors?.name?.message}</p>
        )}
      </div>

      {/* AddressLine1 */}
      <div className='flex flex-col'>
        <label htmlFor='addressLine1'>Endereço</label>
        <input
          id='address_line_1'
          {...register('addressLine1', {
            required: 'Este campo é obrigatório'
          })}
          placeholder='Rua Dom Pedro I'
          className='input input-bordered input-primary'
        />
        {errors.addressLine1 && (
          <p className='text-primary text-sm mt-1'>
            {errors?.addressLine1?.message}
          </p>
        )}
      </div>

      {/* AddressLine2 */}
      <div className='flex flex-col'>
        <label htmlFor='addressLine2'>Número/Complemento</label>
        <input
          id='address_line_2'
          {...register('addressLine2', {
            required: 'Este campo é obrigatório'
          })}
          placeholder='745 C3'
          className='input input-bordered input-primary'
        />
        {errors.addressLine2 && (
          <p className='text-primary text-sm mt-1'>
            {errors?.addressLine2?.message}
          </p>
        )}
      </div>

      {/* Neighborhood */}
      <div className='flex flex-col'>
        <label htmlFor='neighborhood'>Bairro</label>
        <input
          id='neighborhood'
          {...register('neighborhood', {
            required: 'Este campo é obrigatório'
          })}
          placeholder='Jardim Liberdade'
          className='input input-bordered input-primary'
        />
        {errors.neighborhood && (
          <p className='text-primary text-sm mt-1'>
            {errors?.neighborhood?.message}
          </p>
        )}
      </div>

      {/* City */}
      <div className='flex flex-col'>
        <label htmlFor='city'>Cidade</label>
        <input
          id='city'
          {...register('city', {
            required: 'Este campo é obrigatório'
          })}
          placeholder='São Paulo'
          className='input input-bordered input-primary'
        />
        {errors.city && (
          <p className='text-primary text-sm mt-1'>{errors?.city?.message}</p>
        )}
      </div>

      {/* State */}
      <div className='flex flex-col'>
        <label htmlFor='state'>Estado</label>
        <input
          id='state'
          {...register('state', {
            required: 'Este campo é obrigatório'
          })}
          placeholder='SP'
          className='input input-bordered input-primary'
        />
        {errors.state && (
          <p className='text-primary text-sm mt-1'>{errors?.state?.message}</p>
        )}
      </div>
      <div className='modal-action'>
        <button
          type='button'
          className='btn btn-bg-300'
          onClick={() => {
            reset()
            closeModal()
          }}
        >
          Cancelar
        </button>
        <button
          className='btn btn-primary'
          type='submit'
          disabled={addAddressMutation.isPending}
        >
          {addAddressMutation.isPending ? (
            <span className='loading loading-spinner loading-xs' />
          ) : (
            'Adicionar'
          )}
        </button>
      </div>
    </form>
  )
}
