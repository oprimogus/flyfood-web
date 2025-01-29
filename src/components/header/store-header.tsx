import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Store as StoreIcon } from 'lucide-react'
import type { Store } from '@/service/flyfood-api/types'
import Image from "next/image"

interface StoreHeaderProps {
  store: Store
}

export default function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-t-lg h-48 lg:h-64">
      {!store.headerImage ? (
        <div className="w-full h-full bg-gradient-to-r from-red-200 to-red-500 flex items-center justify-center">
        </div>
      ) : (
        <Image
          src={store.headerImage}
          alt={store.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover md:object-contain transition-transform hover:scale-105"
        />
      )}

      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6'>
        <div className='flex items-center'>
          <Avatar className='w-24 h-24 border-4 border-white mr-4'>
            <AvatarImage src={store.profileImage} alt={store.name} />
            <AvatarFallback>
              <StoreIcon className='w-14 h-14 text-white' />
            </AvatarFallback>
          </Avatar>
          <h1 className='text-3xl font-bold text-white mb-1'>{store.name}</h1>
        </div>
      </div>
    </div>
  )
}
