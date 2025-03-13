'use client'
import { useFindStores } from '@/hooks/flyfood/useFindStores'
import { GetStoresByFilterInput, storeTypeList } from '@/service/flyfood-api/types'
import { BikeIcon, ClockIcon, MenuIcon, SearchIcon, StoreIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

export default function ListStores() {
  const { storeList, isLoading, queryParams, setQueryParams } = useFindStores()
  const { register, handleSubmit } = useForm<GetStoresByFilterInput>({
    mode: 'onSubmit',
    defaultValues: {
      ...queryParams
    }
  })

  const handleSearch = async (input: GetStoresByFilterInput) => {
    setQueryParams((prev) => ({ ...prev, ...input }))
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center gap-2'>
        <form
          onSubmit={handleSubmit(handleSearch)}
          className='flex justify-items-center gap-2 m-4'>
          <label className='input input-bordered flex items-center gap-2 w-[75vw] max-w-screen-sm'>
            <input
              {...register('name', {
                required: 'Este campo é obrigatório',
              })}
              type='text'
              className='grow w-full'
              placeholder='Pesquisa por lojas, produtos...'
            />
            <button type='submit'>
              <SearchIcon />
            </button>
          </label>
          <div className="relative drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="btn btn-primary">
                <MenuIcon />
              </label>
            </div>
            <div className="drawer-side z-50">
              <label 
                htmlFor="my-drawer-4" 
                aria-label="close sidebar" 
                className="drawer-overlay"></label>
              <ul className="bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                    <p>Tipo de loja</p>
                    <select className="select w-full max-w-xs">
                      {Object.entries(storeTypeList).map(([key, value]) => (
                        <option key={key} value={value}>{value}</option>
                      ))}
                    </select>

                </li>
                <li>
                  <button type='submit' className='btn btn-primary'>
                    Filtrar
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* <details className='dropdown dropdown-left dropdown-bottom'>
            <summary className='btn btn-primary'>
              <MenuIcon />
            </summary>
            <ul className='menu dropdown-content bg-base-100 rounded-box z-[10] w-52 p-2 shadow'>
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
          </details> */}
        </form>
      </div>

      <div className='space-y-4'>
        {!storeList && isLoading && Array.from({ length: 5 }).map((_, index) => (
          <div key={`fake${index}`}>
            <div className="py-2 block">
              <div className="card card-side shadow-xl hover:shadow-2xl">
                <div className='skeleton h-16 w-full'></div>
              </div>
            </div>
          </div>
        ))}
        {storeList?.length === 0 && (
          <div className="flex flex-col pt-24 items-center text-center space-y-4 px-4">
            <Image
              src="/flyfood/ilustration/quiet_street.svg"
              alt="Nenhuma loja encontrada"
              width={300}
              height={200}
              className="rounded-lg opacity-80"
            />
            <h2 className="text-lg font-semibold text-gray-700">
              Nenhuma loja encontrada na sua região
            </h2>
            <p className="text-gray-500 max-w-xs">
              Tente alterar os filtros ou buscar por outra categoria de produtos.
            </p>
            <button className="btn btn-primary">
              Explorar categorias
            </button>
          </div>
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
                  {/* <div className="flex flex-row items-center gap-1 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    <span>{store.deliveryTime ?? '30-45'} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <BikeIcon className="w-4 h-4" />
                    <span>R$ {store?.deliveryFee?.toFixed(2) ?? '5.00'}</span>
                  </div> */}
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
