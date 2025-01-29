import React from 'react'
import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'

export default async function OwnerPage() {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  return (
    <>
      <h1>Ola</h1>

      {/* <LoggedHeader session={session} />  */}
      {/* <OwnerStoreList session={session} /> */}
    </>
  )
}
