'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormAddAddress } from '@/components/forms/add-address'
import { MapPin } from 'lucide-react'
import { useAddress, useCustomer, useRemoveAddress } from '@/hooks/use-api'
import { Session } from 'next-auth'
import { Address, FlyFoodError } from '@/service/flyfood-api/types'
import { toast } from '@/hooks/use-toast'
import { useEffect } from 'react'

interface AddressSelectorProps {
  session: Session
}

export default function AddressSelector({ session }: AddressSelectorProps) {
  const { data: customerResult } = useCustomer(session)
  const { addresses, selectedAddress, setSelectedAddress } = useAddress(session)
  const { mutate: removeAddress, isPending } = useRemoveAddress(session)

  if (!selectedAddress && customerResult?.ok) {
    setSelectedAddress(customerResult?.value.addresses[0])
  }

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      setSelectedAddress(addresses[0])
    }
  } , [addresses, selectedAddress])

  const handleRemoveAddress = async (address: Address) => {
    removeAddress(address, {
      onSuccess: () => {
        const index = addresses.findIndex((addr) => addr.addressLine1 === address.addressLine1)
        const newIndex = index === 0 ? index + 1 : index - 1
        setSelectedAddress(addresses[newIndex])
        toast({
          title: "Endereço removido!",
          description: "O seu endereço foi removido com sucesso.",
          variant: "default",
        })
      },
      onError: (error) => {
        try {
          const err = JSON.parse(error.message) as FlyFoodError
          toast({
            title: "Erro ao remover endereço",
            description: err.error,
            variant: "destructive",
          })
        } catch (e) {
          console.error("Erro ao salvar novo endereço", e)
          toast({
            title: "Erro ao salvar novo endereço",
            description: "Não foi possível salvar novo endereço. Tente novamente mais tarde.",
            variant: "destructive",
          })
        }
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-white flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span className="hidden md:inline truncate max-w-[150px]">
            {selectedAddress ? selectedAddress.name : 'Selecionar endereço'}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white flex flex-col justify-center">
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Selecione o endereço de entrega
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col mt-4 space-y-4">
          {addresses && (
            <ul className="w-full space-y-4">
              {addresses.map((addr, i) => (
                <li
                  onClick={() => setSelectedAddress(addr)}
                  key={i + addr.name + '-' + addr.addressLine1}
                  className={`p-4 border rounded-lg bg-gray-50 hover:bg-red-100 transition-all duration-300
                    ${addr.addressLine1 === addr?.addressLine1 ? 'border-red-400' : ''}`}
                >
                  <div className='flex flex-row text-align-center justify-between'>
                    <h2 className="text-lg font-semibold text-gray-800">{addr.name}</h2>
                    <Button onClick={() => handleRemoveAddress(addr) }>X</Button>
                  </div>
                  <p className="text-gray-600 mt-1">
                    {addr.addressLine1}, {addr.addressLine2}, {addr.neighborhood}, {addr.postalCode}
                  </p>
                </li>
              ))}
            </ul>
          )}
          {/* Adicionando o componente de formulário */}
          <FormAddAddress />
        </div>
      </DialogContent>
    </Dialog>
  )
}
