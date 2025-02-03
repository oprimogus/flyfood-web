import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import LoggedHeader from '@/components/header/logged-header'
import StoreList from '@/components/list/store-list'

export default async function RestaurantListPage() {
  const session = await auth()
  if (!session) {
    redirect('/')
  }

  return (
    <>
      <LoggedHeader session={session} />
      <StoreList session={session} />
    </>
  )
}
