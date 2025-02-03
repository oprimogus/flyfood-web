'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Search, ShoppingCart, User } from 'lucide-react'
import type { Session } from 'next-auth'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import AddressSelector from '@/components/selector/address-selector'
import MobileMenu from '@/components/menu/mobile-menu'

export interface LoggedHeaderProps {
  session: Session
}

export default function LoggedHeader({ session }: { session: Session }) {
  return (
    <nav className='w-full bg-white shadow-md sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link href='/restaurants' className='flex items-center space-x-3'>
            <div className='h-10 w-10 relative'>
              <Image
                src='/flyfood/flyfood-red.svg'
                alt='FlyFood Logo'
                fill
                className='object-contain'
                priority
              />
            </div>
            <span className='text-xl font-bold text-red-500 hidden md:inline'>FLYFOOD</span>
          </Link>

          {/* Search Bar */}
          <div className='flex-1 max-w-2xl mx-4 hidden md:block'>
            <form
              className='relative'
              method='POST'
              action='/restaurant'
            >
              <Input
                type='text'
                name='query'
                className='w-full pl-4 pr-12 py-2 border border-gray-200 rounded-full focus:border-red-600 focus:ring focus:ring-red-100'
                placeholder='Buscar item ou loja...'
                required
              />
              <Button
                type='submit'
                size='icon'
                variant='ghost'
                className='absolute right-0 top-0 h-full rounded-full text-gray-400 hover:text-red-600'
              >
                <Search className='w-5 h-5' />
              </Button>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center space-x-4'>
            <AddressSelector session={session} />
            
            <Button 
              variant='ghost' 
              size='icon'
              className='text-gray-600 hover:text-red-600 transition-colors'
            >
              <ShoppingCart className='w-6 h-6' />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant='ghost' 
                  size='icon'
                  className='text-gray-600 hover:text-red-600 transition-colors'
                >
                  <User className='w-6 h-6' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='bg-white w-[300px] sm:w-[400px]'>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <MobileMenu session={session} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
