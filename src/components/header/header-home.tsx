'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'

// Unlogged Header Component
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='w-full bg-white shadow-md sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-3'>
            <div className='h-10 w-10 relative'>
              <Image
                src='/flyfood/flyfood-red.svg'
                alt='FlyFood Logo'
                fill
                className='object-contain'
                priority
              />
            </div>
            <span className='text-xl font-bold text-red-500'>FLYFOOD</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link href='/cadastro-loja' className='text-gray-600 hover:text-red-600 font-medium transition-colors'>
              Anuncie seu negócio
            </Link>
            <Link href='/' className='text-gray-600 hover:text-red-600 font-medium transition-colors'>
              Restaurantes
            </Link>
            <Link href='/' className='text-gray-600 hover:text-red-600 font-medium transition-colors'>
              Lojas
            </Link>
            <Button
              onClick={() => signIn('zitadel', { redirectTo: '/restaurants' })}
              className='bg-red-600 hover:bg-red-700 text-white'
            >
              Entre ou cadastre-se
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className='md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden pt-4 pb-3 border-t mt-3 space-y-3'>
            <Link href='/cadastro-loja' className='block text-gray-600 hover:text-red-600 font-medium py-2'>
              Anuncie seu negócio
            </Link>
            <Link href='/' className='block text-gray-600 hover:text-red-600 font-medium py-2'>
              Restaurantes
            </Link>
            <Link href='/' className='block text-gray-600 hover:text-red-600 font-medium py-2'>
              Lojas
            </Link>
            <div className='pt-2'>
              <Button
                onClick={() => signIn('zitadel', { redirectTo: '/restaurants' })}
                className='w-full bg-red-600 hover:bg-red-700 text-white'
              >
                Entre ou cadastre-se
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}