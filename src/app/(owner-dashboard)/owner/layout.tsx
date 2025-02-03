import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import NavHome from '@/components/nav/nav-home'

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

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
