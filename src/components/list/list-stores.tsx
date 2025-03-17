'use client'
import { useFindStores } from '@/hooks/flyfood/useFindStores'
import { GetStoresByFilterInput, storeTypeTranslation } from '@/service/flyfood-api/types'
import { MenuIcon, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Image from 'next/image'
import StoreCard from '@/components/card/storeCard'

export default function ListStores() {
  const { storeList, isLoading, queryParams, setQueryParams } = useFindStores()
  const [currentPage, setCurrentPage] = useState(storeList?.currentPage || 1)

  const totalPages = storeList?.totalPages || 1

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
      setQueryParams({ ...queryParams, page: newPage })
    }
  }

  const { register: registerSearch, handleSubmit: handleSubmitSearch } = useForm<{ name: string }>({
    defaultValues: { name: queryParams.name || '' }
  })

  const { register: registerFilters, handleSubmit: handleSubmitFilters, watch, control } = useForm<GetStoresByFilterInput>({
    defaultValues: { ...queryParams, range: 0, type: undefined, maxItems: 5 }
  })

  const range = watch("range")

  // Função para pesquisa por nome
  const handleSearchByName = async ({ name }: { name: string }) => {
    const newParams = {
      ...queryParams,
      name
    }
    setQueryParams(newParams)
  }

  const handleSearchByFilters = async (input: GetStoresByFilterInput) => {
    const newParams = {
      ...queryParams,
      range: Number(input.range),
      type: input.type || undefined
    }
    setQueryParams(newParams)
  }

  const renderPagination = () => {
    const maxPagesToShow = 4
    
    // Determinar página inicial e final a exibir
    let startPage = currentPage
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    
    // Se estamos na página 1, mostrar as primeiras páginas
    if (currentPage === 1) {
      startPage = 1
      endPage = Math.min(totalPages, maxPagesToShow)
    } 
    // Caso contrário, centralizar a página atual
    else {
      // Ajustar para mostrar 2 páginas antes e 2 depois quando possível
      startPage = Math.max(1, currentPage - 2)
      endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
      
      // Se não conseguimos mostrar 5 páginas a partir de startPage, ajustar novamente
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1)
      }
    }
    
    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }
    
    return (
      <div className="join justify-center text-center mt-4">
        {/* Botão Anterior */}
        <button
          className="join-item btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<"}
        </button>
        
        {/* Páginas */}
        {pages}
        
        {/* Mostrar ... apenas se há mais páginas depois */}
        {endPage < totalPages && (
          <span className="join-item btn btn-disabled">...</span>
        )}
        
        {/* Botão Próximo */}
        <button
          className="join-item btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
    )
  }

  useEffect(() => {
    console.log('Parâmetros atuais:', queryParams)
  }, [queryParams])

  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center'>

        {/* Formulário de pesquisa por nome */}
        <form onSubmit={handleSubmitSearch(handleSearchByName)} className='flex justify-items-center gap-2 m-4'>
          <label className='input input-bordered flex items-center gap-2 w-[75vw] max-w-screen-sm'>
            <input
              {...registerSearch('name', { required: 'Este campo é obrigatório' })}
              type='text'
              className='grow w-full'
              placeholder='Pesquisa por lojas, produtos...'
            />
            <button type='submit'>
              <SearchIcon />
            </button>
          </label>
        </form>

        {/* Botão para abrir o drawer de filtros */}
        <div className="relative drawer-end px-2">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer-4" className="btn btn-primary">
              <MenuIcon />
            </label>
          </div>

          {/* Drawer com filtros avançados */}
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <form onSubmit={handleSubmitFilters(handleSearchByFilters)} className="bg-base-200 text-base-content min-h-full w-80 p-4 space-y-4">
              <p>Tipo de loja</p>
              <select {...registerFilters("type")} className="select w-full max-w-xs">
                <option key={''} value={''}>Nenhum</option>
                {Object.entries(storeTypeTranslation).map(([key, value]) => (
                  <option key={value} value={key}>{value}</option>
                ))}
              </select>

              <p>Distância: {range} km</p>
              <div className="w-full max-w-xs">
                <Controller
                  name="range"
                  control={control}
                  render={({ field }) => (
                    <input {...field} type="range" min={0} max={20} step={1} className="range" />
                  )}
                />
                <div className="flex justify-between px-2.5 mt-2 text-xs">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                </div>
              </div>

              <button type='submit' className='btn btn-primary'>
                Filtrar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Lista de lojas */}
      <div className='w-full p-4 space-y-4'>
        {/* Loader state */}
        {!storeList && isLoading && (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="block">
              <div className="card card-side h-32 m-4 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className='skeleton h-full w-full py-2' />
              </div>
            </div>

          ))
        )}

        {/* Empty state */}
        {storeList?.data.length === 0 && (
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

        {/* Store list */}
        {storeList && storeList.data.length > 0 && (
          <div className='flex flex-col justify-center'>
            {storeList.data.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  )
}
