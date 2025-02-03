import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Menu, ShoppingCart, User } from 'lucide-react'
import ButtonSignOut from '../button/sign-out'
import ModalAddress from '../modal/modal-address'

export default function NavLogged() {
  return (
    <nav className='navbar bg-base-100 justify-between mb-4 shadow-md sticky top-0 z-50'>
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
        <span className='hidden md:flex text-xl font-bold text-primary'>
          FLYFOOD
        </span>
      </Link>

      <div>
        <ModalAddress />
      </div>

      {/* Mobile Menu Button */}
      <div className='btn-primary text-black md:hidden'>
        <details>
          {/* Ícone do Menu */}
          <summary className='cursor-pointer flex items-center p-2 rounded'>
            <Menu className='h-6 w-6 text-primary' />
          </summary>

          {/* Conteúdo do Menu */}
          <div className='absolute top-full left-0 w-full bg-white shadow-lg p-4'>
            <div className='flex flex-col w-full space-y-4 items-center'>
              {' '}
              {/* Alinhado ao centro */}
              <Link href='/profile' className='text-lg px-4 text-center w-full'>
                Meu Perfil
              </Link>
              <Link
                href='/checkout'
                className='text-lg px-4 text-center w-full'
              >
                Carrinho
              </Link>
              <Link href='/orders' className='text-lg px-4 text-center w-full'>
                Pedidos
              </Link>
              <ButtonSignOut />
            </div>
          </div>
        </details>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex mx-4 items-center space-x-8'>
        <button type='button' className='btn'>
          <ShoppingCart className='w-6 h-6' />
        </button>
        <details className='dropdown dropdown-bottom dropdown-end'>
          <summary className='btn m-1'>
            <User className='w-6 h-6' />
          </summary>
          <ul className='menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
            <li>
              <Link href='/profile' className='text-lg px-4 text-center w-full'>
                Meu Perfil
              </Link>
            </li>
            <li>
              <Link
                href='/checkout'
                className='text-lg px-4 text-center w-full'
              >
                Carrinho
              </Link>
            </li>
            <li>
              <Link href='/orders' className='text-lg px-4 text-center w-full'>
                Pedidos
              </Link>
            </li>
            <ButtonSignOut />
          </ul>
        </details>
      </div>
    </nav>
  )
}
