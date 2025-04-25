'use client'
import { useAddress } from '@/hooks/flyfood/useAddress'
import type { QueryStoreList } from '@/service/flyfood-api/types'
import {
  calculateDistance,
  formatDeliveryTimeToHour,
  formatRating
} from '@/utils/utils'
import { StoreIcon, Star, MapPinned, Hourglass, Bike } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  store: QueryStoreList
}

export default function StoreCard({ store }: Props) {
  const { selectedAddress } = useAddress()
  const hasAllCoordinates =
    selectedAddress?.latitude &&
    selectedAddress?.longitude &&
    store.latitude &&
    store.longitude
  return (
    <Link
      href={`/restaurants/${store.id}`}
      className='lock transition-all hover:scale-[1.02] active:scale-[0.98]'
    >
      <div className='card card-side h-32 mx-2 my-4 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow'>
        <figure className='w-24'>
          {store.profileImage ? (
            <img
              src={store.profileImage}
              alt={store.name}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full bg-primary flex items-center justify-center'>
              <StoreIcon className='w-3/4 h-3/4 text-white' />
            </div>
          )}
        </figure>

        <div className='card-body py-2'>
          <h2 className='card-title text-lg text-center'>{store.name}</h2>
          <div className='flex flex-row space-x-2 justify-center justify-items-center py-2'>
            <Star className='text-accent fill-current' />
            <p className='text-sm text-gray-600'>{formatRating(store.score)}</p>
            <Hourglass />
            <p className='text-sm text-gray-600'>
              ~{formatDeliveryTimeToHour(store.deliveryTime)}
            </p>
          </div>
          <div className='flex flex-row space-x-2 justify-center justify-items-center'>
            <MapPinned />
            <p className='text-sm text-gray-600'>{store.neighborhood}</p>
            {hasAllCoordinates && (
              <>
                <Bike />
                <p className='text-sm text-gray-600'>
                  {calculateDistance(
                    selectedAddress.latitude,
                    selectedAddress.longitude,
                    store.latitude,
                    store.longitude
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
