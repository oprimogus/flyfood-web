import NavLogged from '@/components/nav/nav-logged'
import type { Metadata } from 'next'
import { auth } from '@/app/auth'
import { flyFoodApi } from '@/service/flyfood-api/service'
import { Geist, Geist_Mono } from 'next/font/google'

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
    return <h1>USUÁRIO NÃO LOGADO</h1>
  }

  const customerResult = await flyFoodApi.getCustomerV1(session)
  if (!customerResult.ok) {
    console.error(customerResult)
    return (
      <pre>
        <code>
          {JSON.stringify(customerResult, null, 2)}
          {JSON.stringify(session, null, 2)}
        </code>
      </pre>
    )
  }

  return (
    // <html lang="en" data-theme="firstTheme">
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >

    //   </body>
    // </html>
    <>
      <NavLogged />
      {children}
    </>
  )
}
