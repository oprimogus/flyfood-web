import LoggedHeader from '@/components/header/logged-header3'
import { auth } from '../auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  return <LoggedHeader session={session} />
}
