import { signOut } from '@/app/auth'
import { cookies } from 'next/headers'
import React from 'react'

export default function ButtonSignOut() {
  return (
    <form
      action={async () => {
        'use server'
        const cookieStore = await cookies()
        for (const c of cookieStore.getAll()) {
          cookieStore.delete(c.name)
        }
        await signOut({
          redirect: true,
          redirectTo: '/'
        })
      }}
    >
      <button type='submit' className='btn btn-primary w-full'>
        Sair
      </button>
    </form>
  )
}
