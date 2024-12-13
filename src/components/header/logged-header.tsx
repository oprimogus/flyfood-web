'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { getCustomerV1 } from '@/service/flyfood-api/service'
import type { Address, Customer } from '@/service/flyfood-api/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { Search, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DialogFooter, DialogHeader } from '../ui/dialog'
import { Input } from '../ui/input'
import { signOut, useSession } from "next-auth/react"
import { Session } from 'next-auth'

export interface LoggedHeaderProps {
  session: Session
}

export default function LoggedHeader(props: LoggedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [address, setAddress] = useState<Address | null>(null)
  const { data: customer } = useQuery({
    queryKey: ['customer'],
    staleTime: Infinity,
    queryFn: () => getCustomerV1(props.session),
    enabled: !!props.session.user,
  })

  useEffect(() => {
    if (customer?.addresses && customer.addresses.length > 0) {
      setAddress(customer.addresses[0]);
    }
  }, [customer]);

  return (
    <nav className='w-full bg-red-600 shadow p-4 flex items-center justify-between relative'>
      {/* Logo */}
      <Link href='/' className='flex items-center space-x-4'>
        <Avatar>
          <AvatarImage src='/flyfood/flyfood-white.svg' />
          <AvatarFallback>FF</AvatarFallback>
        </Avatar>
        <h1 className='text-white text-xl font-bold'>FLYFOOD</h1>
      </Link>

      {/* Barra de busca centralizada */}
      <form
        className='flex items-center absolute left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg w-2/5 h-12 md:w-1/3 focus-within:outline-none focus-within:ring-0'
        method='POST'
        action='/restaurant'
      >
        <div className='flex items-center px-4'>
          <Search className='w-5 h-5 text-gray-500' />
        </div>
        <Input
          type='text'
          name='query'
          className='w-full h-full rounded-full border-0 focus:border-0 focus:outline-none focus:ring-0 placeholder-gray-400'
          placeholder='Buscar item ou loja...'
          required
        />
      </form>

      {/* Ações do usuário */}
      <div className='hidden md:flex items-center space-x-12'>
        <Dialog>
          <DialogTrigger asChild>
            <h1 className='text-white cursor-pointer hover:text-gray-300 transition-colors duration-300'>
              {address
                ? address.name
                : 'Adicionar endereço'}
            </h1>
          </DialogTrigger>
          <DialogContent className='w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-2xl flex flex-col justify-center items-center p-6'>
            <DialogHeader className='mb-4'>
              <DialogTitle className='text-2xl font-semibold text-gray-800'>
                Qual o endereço de entrega?
              </DialogTitle>
              {/* <form
                className='flex items-center bg-gray-100 rounded-full shadow-md w-full h-12 mt-4'
                method='POST'
                action='/api/search'
              >
                <div className='flex items-center px-4'>
                  <Search className='w-5 h-5 text-gray-500' />
                </div>
                <Input
                  type='text'
                  name='query'
                  className='w-full h-full rounded-full border-0 focus:border-0 focus:outline-none focus:ring-0 placeholder-gray-400'
                  placeholder='Buscar endereço e número...'
                  required
                />
              </form> */}
            </DialogHeader>

            {/* Conteúdo do diálogo */}
            {customer?.addresses && (
              <ul className="w-full space-y-4">
                {customer.addresses.map((addr) => (
                  <li
                    onClick={() => setAddress(addr)}
                    key={addr.addressLine1}
                    className={`p-4 border rounded-lg bg-gray-50 hover:bg-red-100 transition-all duration-300 
                      ${addr.addressLine1 === address?.addressLine1 
                      ? 'border-red-400' 
                      : ''}`}
                  >
                    <h2 className="text-lg font-semibold text-gray-800">{addr.name}</h2>
                    <p className="text-gray-600 mt-1">
                      {addr.addressLine1}, {addr.addressLine2}, {addr.neighborhood}, {addr.postalCode}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <DialogFooter className='mt-4'>
              <DialogClose asChild>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type='button'
              className='flex items-center justify-center text-white hover:text-gray-300 transition duration-200 focus:outline-none'
            >
              <User className='w-6 h-6' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='bg-white text-gray-800 shadow-lg rounded-md w-48 p-2 space-y-1 z-50'
            align='end'
          >
            <DropdownMenuLabel className='text-gray-600 text-sm font-semibold'>
              Minha Conta
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='h-px bg-gray-200' />
            <DropdownMenuItem className='px-4 py-2 rounded hover:bg-gray-100 cursor-pointer'>
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className='px-4 py-2 rounded hover:bg-gray-100 cursor-pointer'>
              Pedidos
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut({ redirectTo: '/' })}
              className='px-4 py-2 rounded hover:bg-gray-100 cursor-pointer text-red-600'>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ShoppingCart className='text-white hover:text-gray-300 transition duration-200 cursor-pointer' />
      </div>

      {/* Menu hambúrguer no mobile */}
      <button
        type='button'
        className='md:hidden text-white'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Menu dropdown no mobile */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 w-full bg-red-600 text-white p-4 flex flex-col space-y-2 md:hidden'>
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
    </nav>
  )
}
