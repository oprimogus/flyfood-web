import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Store as StoreIcon } from 'lucide-react'
import { Store } from '@/service/flyfood-api/types'

interface StoreHeaderProps {
  store: Store
}

export default function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <div className='relative w-full h-64 overflow-hidden rounded-t-lg'>
      {!store.headerImage && (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
        </div>
      )}
      {store.headerImage && (
        <img
          alt='store header'
          className='w-full h-full object-cover'
          src={store.headerImage}
          loading='lazy'
        />
      )}

      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6'>
        <div className='flex items-center'>
          <Avatar className='w-24 h-24 border-4 border-white mr-4'>
            <AvatarImage src={store.profileImage} alt={store.name} />
            <AvatarFallback>
              <StoreIcon className='w-14 h-14 text-white'/>
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className='text-3xl font-bold text-white mb-1'>{store.name}</h1>
            <p className='text-gray-200'>{store.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
