import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center p-4'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <figure className='px-10 pt-10'>
          <img
            src='/flyfood/ilustration/not-found.svg'
            alt='404 Illustration'
            className='w-64 h-64'
          />
        </figure>
        <div className='card-body items-center text-center'>
          <h1 className='card-title text-4xl font-bold text-error'>404</h1>
          <h2 className='text-2xl font-semibold'>Página não encontrada</h2>
          <p className='text-base-content/70 mt-2'>
            Desculpe, a página que você está procurando não existe ou foi
            movida.
          </p>
          <div className='card-actions mt-6'>
            <Link href='/' className='btn btn-primary'>
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
