import { signIn } from '@/app/auth'
import React from 'react'

export default function ButtonSignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('zitadel', { 
          redirectTo: '/restaurants',
          
        })
      }}
    >
      <button type='submit' className='btn btn-primary'>
        Entre ou Cadastre-se
      </button>
    </form>
  )
}
