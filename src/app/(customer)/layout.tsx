import NavLogged from '@/components/nav/nav-logged'
import type { Metadata } from 'next'
import { auth } from '@/app/auth'
import { flyFoodApi } from '@/service/flyfood-api/service'
import { Geist, Geist_Mono } from 'next/font/google'
import { redirect } from 'next/navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'FlyFood',
  description: 'As melhores lojas da sua região em um só lugar'
}

export default async function AuthenticatedLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }

  const customerResult = await flyFoodApi.getCustomerV1(session)
  if (!customerResult.ok) {
    throw new Error('Failed to get customer information')
  }

  return (
    <>
      <NavLogged />
      {children}
    </>
  )
}
