import { signOut } from '@/app/auth'
import React from 'react'

export default function ButtonSignOut() {
  return (
    <form
      action={async () => {
        'use server'
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
