import { auth } from '@/app/auth'
import LoggedHeader from '@/components/header/logged-header'
import StoreHeader from '@/components/header/store-header'
import { redirect } from 'next/navigation'
import { flyFoodApi } from '@/service/flyfood-api/service'
import { ProductList } from '@/components/list/product-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { StoreBadges } from '@/components/badges/store-badge'
import { StoreRating } from '@/components/rating/store-rating'
import { StoreInfoDrawer } from '@/components/drawer/store-info-drawer'

export default async function StorePage({ params }: { params: { id: string } }) {
  const { id } = await params
  const session = await auth()
  if (!session) {
    redirect('/')
  }

  const result = await flyFoodApi.getStoreByIDV1(session, id)

  if (!result.ok) {
    redirect('/404')
  }

  const store = result.value

  return (
    <div className="min-h-screen bg-gray-100">
      <LoggedHeader session={session} />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <StoreHeader store={store} />
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <StoreBadges store={store} />
                <StoreRating score={store.score} />
              </div>
              <StoreInfoDrawer store={store} />
            </div>
            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="info">Mais detalhes</TabsTrigger>
              </TabsList>
              <TabsContent value="menu">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input type="search" placeholder="Search products..." className="pl-10" />
                  </div>
                </div>
                <ProductList products={store.products} />
              </TabsContent>
              <TabsContent value="info">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{store.name}</h3>
                  <p>{store.description}</p>
                  <h4 className="text-lg font-semibold">Endereço</h4>
                  <p>{store.address.addressLine1}, {store.address.addressLine2}</p>
                  <p>{store.address.city}, {store.address.state} {store.address.postalCode}</p>
                  <h4 className="text-lg font-semibold">Formas de contato</h4>
                  <p>Celular: {store.phone}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

