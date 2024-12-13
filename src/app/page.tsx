import Header from '@/components/header/header-home'
import LoggedHeader from '@/components/header/logged-header'
import { Button } from '@/components/ui/button'
import { auth } from './auth'

export default async function Root() {
  const session = await auth()
  return (
    <main>
      {session?.user ? <LoggedHeader session={session} /> : <Header />}
      <section className='h-screen bg-red-100 flex flex-col items-center justify-center text-center p-6'>
        <h2 className='text-4xl font-bold text-gray-800'>
          Receba suas comidas favoritas em minutos!
        </h2>
        <p className='text-lg text-gray-600 mt-4'>
          Descubra os melhores restaurantes perto de você.
        </p>
        <Button className='mt-6 bg-red-600 text-white px-8 py-4 text-lg'>
          Comece agora
        </Button>
      </section>
    </main>
  )
}
