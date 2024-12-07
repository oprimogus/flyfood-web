import Header from '@/components/header/header-home';
import ShowStore from '@/components/test/show-store';

export default async function StorePage({
  params,
}: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <Header />
      <div className="flex flex-col mt-8 items-center justify-start" />
      <ShowStore id={id} />
    </>
  );
}
