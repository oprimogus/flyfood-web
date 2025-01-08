'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Search, ShoppingCart, User } from 'lucide-react'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import AddressSelector from '@/components/selector/address-selector'
import MobileMenu from '@/components/menu/mobile-menu'

export interface LoggedHeaderProps {
  session: Session
}

export default function LoggedHeader({ session }: LoggedHeaderProps) {
  return (
    <nav className='w-full bg-red-600 shadow p-4 flex items-center justify-between relative'>
      <div className="flex items-center space-x-2">
        <Link href='/' className='flex items-center space-x-2'>
          <Avatar className="h-8 w-8">
            <AvatarImage src='/flyfood/flyfood-white.svg' />
            <AvatarFallback>FF</AvatarFallback>
          </Avatar>
          <h1 className='text-white text-lg font-bold hidden md:block'>FLYFOOD</h1>
        </Link>
      </div>

      <div className="flex-1 mx-4 hidden md:block">
        <form
          className='flex items-center bg-white rounded-full shadow-lg h-10'
          method='POST'
          action='/restaurant'
        >
          <Input
            type='text'
            name='query'
            className='w-full h-full rounded-full border-0 focus:border-0 focus:outline-none focus:ring-0 placeholder-gray-400 pl-4'
            placeholder='Buscar item ou loja...'
            required
          />
          <Button type="submit" size="icon" variant="ghost" className="rounded-full">
            <Search className='w-5 h-5 text-gray-500' />
          </Button>
        </form>
      </div>

      <div className='flex items-center space-x-4'>
        <AddressSelector session={session}/>
        <Button variant="ghost" size="icon" className="text-white">
          <ShoppingCart className='w-6 h-6' />
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <User className='w-6 h-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <MobileMenu session={session} />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

