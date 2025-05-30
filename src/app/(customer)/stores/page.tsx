import ListStores from '@/components/list/list-stores'
import React from 'react'

export default function Stores() {
  return (
    <div className='space-y-4 min-h-screen flex flex-col items-center'>
      <h1 className='text-base-content font-bold text-center mt-4'>
        Veja as lojas disponíveis na sua região
      </h1>
      <ListStores />
    </div>
  )
}
