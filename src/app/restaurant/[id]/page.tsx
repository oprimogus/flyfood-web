import LoggedHeader from '@/components/header/logged-header'
import ShowStore from '@/components/test/show-store'

export default async function StorePage({
  params
}: Readonly<{ params: { id: string } }>) {
  const { id } = await params

  return (
    <>
      <LoggedHeader />
      <div className='flex flex-col mt-8 items-center justify-start' />
      <ShowStore id={id} />
    </>
  )
}
