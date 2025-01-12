import { Button } from '@/components/ui/button'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface MobileMenuProps {
  session: Session | null
}

export default function MobileMenu({ session }: MobileMenuProps) {
  return (
    <div className='flex flex-col space-y-4'>
      {session !== null && (
        <>
          <Link href='/profile' className='text-lg'>
            Perfil
          </Link>
          <Link href='/orders' className='text-lg'>
            Pedidos
          </Link>
          <Link href='/restaurants' className='text-lg'>
            Restaurantes
          </Link>
          <Link href='/stores' className='text-lg'>
            Lojas
          </Link>
          {session.user.role === 'OWNER' && (
            <Link href='/business' className='text-lg'>
              Meu Negócio
            </Link>
          )}
          <Button
            onClick={() => signOut({ redirectTo: '/' })}
            variant='destructive'
            className='mt-4'
          >
            Sair
          </Button>
        </>
      )}
      {session === null && (
        <>
          <Link href='/profile' className='text-lg'>
            Anunciar minha loja
          </Link>
          <Button
            onClick={() => signOut({ redirectTo: '/' })}
            variant='destructive'
            className='mt-4'
          >
            Entrar ou cadastrar-se
          </Button>
        </>
      )}
    </div>
  )
}
