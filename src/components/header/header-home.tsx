'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const session = useSession()
  return (
    <nav className='w-full bg-red-600 shadow p-4 flex items-center justify-between'>
      {/* Logo */}
      <Link href='/'>
        <div className='flex items-center space-x-4'>
          <Avatar>
            <AvatarImage src='/flyfood/flyfood-white.svg' />
            <AvatarFallback>FF</AvatarFallback>
          </Avatar>
          <h1 className='text-white text-xl font-bold'>FLYFOOD</h1>
        </div>
      </Link>

      {session.status === 'unauthenticated' && (
        <>
          <div className='hidden md:flex space-x-6'>
            <Link href='/cadastro-loja' className='text-white hover:underline'>
              Anuncie seu negócio aqui
            </Link>
            <Link href='/' className='text-white hover:underline'>
              Restaurantes
            </Link>
            <Link href='/' className='text-white hover:underline'>
              Lojas
            </Link>
          </div>
          <div className='hidden items-center md:flex space-x-4'>
            <Button onClick={() => signIn('zitadel', { redirectTo: '/home' })}>
              Entre ou cadastre-se
            </Button>
          </div>

          {/* Menu hambúrguer no mobile */}
          <button
            type={'button'}
            className='md:hidden text-white'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          {/* Menu dropdown no mobile */}
          {isMenuOpen && (
            <div className='absolute top-full left-0 w-full items-center bg-red-600 text-white p-4 flex flex-col space-y-2 md:hidden'>
              <Link href='/cadastro-loja' className='hover:underline'>
                Anuncie seu negócio aqui
              </Link>
              <Link href='/' className='hover:underline'>
                Restaurantes
              </Link>
              <Link href='/' className='hover:underline'>
                Lojas
              </Link>
              <Link href='/login' className='hover:underline'>
                Entre
              </Link>
              <Link
                href='/cadastro'
                className='bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100'
              >
                Cadastre-se
              </Link>
            </div>
          )}
        </>
      )}

      {session.status === 'authenticated' && (
        <>
          <div className='hidden md:flex space-x-6'>
            <Link href='/restaurant' className='text-white hover:underline'>
              Restaurantes
            </Link>
            <Link href='/' className='text-white hover:underline'>
              Lojas
            </Link>
          </div>

          <div className='hidden items-center md:flex space-x-4'>
            <Button
              variant={'destructive'}
              onClick={() => signOut({ redirectTo: '/' })}
            >
              Sair
            </Button>
          </div>

          {/* Menu hambúrguer no mobile */}
          <button
            type={'button'}
            className='md:hidden text-white'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          {/* Menu dropdown no mobile */}
          {isMenuOpen && (
            <div className='absolute top-full left-0 w-full items-center bg-red-600 text-white p-4 flex flex-col space-y-2 md:hidden'>
              <Link href='/cadastro-loja' className='hover:underline'>
                Anuncie seu negócio aqui
              </Link>
              <Link href='/' className='hover:underline'>
                Restaurantes
              </Link>
              <Link href='/' className='hover:underline'>
                Lojas
              </Link>
              <Link href='/login' className='hover:underline'>
                Entre
              </Link>
              <Link
                href='/cadastro'
                className='bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100'
              >
                Cadastre-se
              </Link>
            </div>
          )}
        </>
      )}
    </nav>
  )
}
