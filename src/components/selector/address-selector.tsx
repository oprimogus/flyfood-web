import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Address, Customer } from '@/service/flyfood-api/types'
import { MapPin } from 'lucide-react'

interface AddressSelectorProps {
  address: Address | undefined
  setAddress: (address: Address) => void
  customer: Customer | undefined
}

export default function AddressSelector({ address, setAddress, customer }: AddressSelectorProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-white flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span className="hidden md:inline truncate max-w-[150px]">
            {address ? address.name : 'Selecionar endereço'}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" bg-white">
        <DialogHeader>
          <DialogTitle>Selecione o endereço de entrega</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {/* Conteúdo do diálogo */}
          {customer?.addresses && (
              <ul className="w-full space-y-4">
                {customer.addresses.map((addr) => (
                  <li
                    onClick={() => setAddress(addr)}
                    key={addr.addressLine1}
                    className={`p-4 border rounded-lg bg-gray-50 hover:bg-red-100 transition-all duration-300 
                      ${addr.addressLine1 === address?.addressLine1 
                      ? 'border-red-400' 
                      : ''}`}
                  >
                    <h2 className="text-lg font-semibold text-gray-800">{addr.name}</h2>
                    <p className="text-gray-600 mt-1">
                      {addr.addressLine1}, {addr.addressLine2}, {addr.neighborhood}, {addr.postalCode}
                    </p>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

