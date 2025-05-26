'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function ErrorPage({
  error,
  reset
}: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Erro capturado:', error)
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-base-100'>
      <Image
        src='/flyfood/ilustration/access_denied.svg'
        alt='Delivery App Showcase'
        width={300}
        height={100}
        className='max-w-sm rounded-lg m-4'
      />
      <h1 className='text-2xl font-bold'>Oops! Algo deu errado.</h1>
      <p className='mt-2'>Tente recarregar a página ou volte mais tarde.</p>
      <button
        type='button'
        onClick={() => reset()}
        className='btn btn-primary m-4'
      >
        Tentar novamente
      </button>
    </div>
  )
}
