'use client'
import { useAddress } from '@/hooks/flyfood/useAddress'
import { useFindStores } from '@/hooks/flyfood/useFindStores'
import { GetStoresByFilterInput } from '@/service/flyfood-api/types'
import { BikeIcon, ClockIcon, MenuIcon, SearchIcon, StoreIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo } from 'react'

export interface ListStoresProps {
  params: GetStoresByFilterInput
}

export default function ListStores() {
  const { selectedAddress } = useAddress()

  // Deriva params diretamente do selectedAddress
  const params = useMemo<GetStoresByFilterInput>(() => ({
    city: selectedAddress?.city ?? '',
    page: 1,
    maxItems: 25
  }), [selectedAddress?.city])

  const { storeList, isLoading } = useFindStores(params)

  return (
    <div className='flex flex-col m-4 p-4 overflow-y-auto'>
      <div className='flex items-center gap-2 p-4 w-full max-w-lg'>
        <label className='input input-bordered flex items-center gap-2 w-full'>
          <SearchIcon />
          <input
            type='text'
            className='grow w-full'
            placeholder='Pesquisa por lojas, produtos...'
          />
        </label>
        <details className='dropdown dropdown-left dropdown-bottom'>
          <summary className='btn btn-primary'>
            <MenuIcon />
          </summary>
          <ul className='menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
            {/* Filtros */}
            <li>
              <select className='select w-full max-w-xs' defaultValue=''>
                <option disabled>
                  Pick your favorite Simpson
                </option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
              </select>
            </li>
            <li>
              <select className='select w-full max-w-xs' defaultValue=''>
                <option disabled>
                  Pick your favorite Simpson
                </option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
              </select>
            </li>
          </ul>
        </details>
      </div>

      <div className='space-y-4'>
        {!storeList && (
          <>
            <div className='skeleton h-32 w-32'>A</div>
            <div className='skeleton h-32 w-32'>A</div>
            <div className='skeleton h-32 w-32'>A</div>
          </>
        )}
        {!storeList && Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <span>CARREGOU</span>
            <div className="py-2 block">
              <div className="card card-side shadow-xl hover:shadow-2xl">
                <div className='skeleton h-16 w-full'></div>
              </div>
            </div>
          </div>
        ))}
        {storeList?.length === 0 && (
          <>
          </>
        )}
        {storeList?.map((store) => (
          <Link
            key={store.id}
            href={`/restaurants/${store.id}`}
            className="py-2 block transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="w-16">
                {store.profileImage ? (
                  <img
                    src={store.profileImage}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary flex items-center justify-center">
                    <StoreIcon className="w-14 h-14 text-white" />
                  </div>
                )}
              </figure>

              <div className="card-body py-2 px-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="card-title text-lg">{store.name}</h2>
                    <p className="text-sm text-gray-600 line-clamp-1">{store.description}</p>
                  </div>
                  {store.rating && (
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{store.rating}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-2">
                  <div className="flex flex-row items-center gap-1 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    <span>{store.deliveryTime ?? '30-45'} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <BikeIcon className="w-4 h-4" />
                    <span>R$ {store?.deliveryFee?.toFixed(2) ?? '5.00'}</span>
                  </div>
                  {/* {store.minOrder && (
                <div className="text-sm text-gray-600">
                  Pedido mín. R$ {store.minOrder.toFixed(2)}
                </div>
              )} */}
                </div>

                {/* {store.tags && store.tags.length > 0 && (
              <div className="flex gap-2 mt-1">
                {store.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 bg-base-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )} */}
              </div>
            </div>
          </Link>

        ))}

      </div>


    </div>
  )
}
