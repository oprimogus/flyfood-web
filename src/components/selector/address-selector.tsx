'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FormAddAddress } from '@/components/forms/add-address'
import { MapPin } from 'lucide-react'
import { useAddress, useRemoveAddress } from '@/hooks/use-api'
import type { Session } from 'next-auth'
import type { Address, FlyFoodError } from '@/service/flyfood-api/types'
import { toast } from '@/hooks/use-toast'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { AddressCard } from '../cards/address-card'
import { Skeleton } from '../ui/skeleton'

interface AddressSelectorProps {
  session: Session
}

export default function AddressSelector({ session }: AddressSelectorProps) {
  const { addresses, selectedAddress, setSelectedAddress } = useAddress(session)
  const { mutate: removeAddress, isPending: isRemoving } =
    useRemoveAddress(session)

  const handleRemoveAddress = (address: Address) => {
    removeAddress(address, {
      onSuccess: () => {
        toast({
          title: 'Endereço removido!',
          description: 'O seu endereço foi removido com sucesso.',
          variant: 'default'
        })
      },
      onError: (error) => {
        try {
          const err = JSON.parse(error.message) as FlyFoodError
          toast({
            title: 'Erro ao remover endereço',
            description: err.error,
            variant: 'destructive'
          })
        } catch (e) {
          console.error('Erro ao remover endereço', e)
          toast({
            title: 'Erro ao remover endereço',
            description:
              'Não foi possível remover o endereço. Tente novamente mais tarde.',
            variant: 'destructive'
          })
        }
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='text-black hover:text-red-500 flex items-center gap-2 max-w-[200px] px-2 sm:px-4'
          aria-label={
            selectedAddress
              ? `Endereço atual: ${selectedAddress.name}`
              : 'Selecionar endereço'
          }
        >
          <MapPin className='h-5 w-5 flex-shrink-0' />
          <span className='hidden sm:inline truncate'>
            {selectedAddress ? selectedAddress.name : 'Selecionar endereço'}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-white sm:max-w-[vh-1/2]'>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-semibold'>
            Selecione o endereço de entrega
          </DialogTitle>
          <DialogDescription className='text-center'>
            Escolha um endereço existente ou adicione um novo
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='max-h-[1/2] pr-4 -mr-4'>
          <div className='space-y-4'>
            {(() => {
              if (isRemoving) {
                return Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className='space-y-3'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                  </div>
                ))
              } else if (addresses?.length === 0) {
                return (
                  <div className='text-center py-4 text-gray-500'>
                    <p>Nenhum endereço cadastrado</p>
                    <p className='text-sm'>Adicione um novo endereço abaixo</p>
                  </div>
                )
              } else {
                return (
                  <div className='space-y-3'>
                    {addresses?.map((addr, i) => (
                      <AddressCard
                        key={i + addr.name + '-' + addr.addressLine1}
                        address={addr}
                        isSelected={addr === selectedAddress}
                        onSelect={setSelectedAddress}
                        onRemove={handleRemoveAddress}
                      />
                    ))}
                  </div>
                )
              }
            })()}
          </div>
        </ScrollArea>

        <div className='pt-4 border-t'>
          <FormAddAddress />
        </div>
      </DialogContent>
    </Dialog>
  )
}
