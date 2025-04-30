import { Menu } from 'lucide-react'
import React from 'react'
import ButtonSignIn from '@/components/button/sign-in'
import Image from 'next/image'
import Link from 'next/link'

export default function NavHome() {
  return (
    <nav className='w-screen navbar bg-base-100 justify-between shadow-md fixed top-0 z-50'>
      <Link href='/' className='flex items-center space-x-3'>
        <div className='h-10 w-10 relative'>
          <Image
            src='/flyfood/logo/flyfood-red.svg' // Caminho correto para o diretório public
            alt='FlyFood Logo'
            fill
            className='object-contain'
            priority
          />
        </div>
        <span className='text-xl font-bold text-primary'>FLYFOOD</span>
      </Link>

      {/* Mobile Menu Button */}
      <div className='btn-primary text-base-content md:hidden'>
        <details>
          {/* Ícone do Menu */}
          <summary className='cursor-pointer flex items-center p-2 rounded'>
            <Menu className='h-6 w-6 text-primary' />
          </summary>

          {/* Conteúdo do Menu */}
          <div className='absolute top-full left-0 w-full bg-base-100 shadow-lg p-4'>
            <div className='flex flex-col w-full space-y-4 items-center'>
              {' '}
              {/* Alinhado ao centro */}
              <Link
                href='/restaurants'
                className='text-lg px-4 text-center w-full'
              >
                Restaurantes
              </Link>
              <Link href='/stores' className='text-lg px-4 text-center w-full'>
                Lojas
              </Link>
              <ButtonSignIn />
            </div>
          </div>
        </details>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex mx-4 items-center space-x-8'>
        <Link href='/owner' className='link-hover'>
          Anuncie seu negócio
        </Link>
        {/* <Link href='/' className='link-hover'>
          Restaurantes
        </Link>
        <Link href='/' className='link-hover'>
          Lojas
        </Link> */}
      </div>
      <div className='hidden md:flex mx-4 items-center space-x-8'>
        <ButtonSignIn />
      </div>
    </nav>
  )
}
