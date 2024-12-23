import { auth } from '@/app/auth'
import LoggedHeader from '@/components/header/logged-header'
import ShowStore from '@/components/test/show-store'
import { redirect } from 'next/navigation'

export default async function StorePage({
  params
}: Readonly<{ params: { id: string } }>) {
  const { id } = await params
  const session = await auth()
  if (!session) {
    redirect('/')
  }

  return (
    <>
      <LoggedHeader session={session} />
      <ShowStore id={id} />
    </>
  )
}
