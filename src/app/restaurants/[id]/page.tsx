import { auth } from '@/app/auth'
import LoggedHeader from '@/components/header/logged-header'
import StoreHeader from '@/components/header/store-header'
import ProductSearch from '@/components/input/product-search'
import AddressSection from '@/components/section/address-section'
import BusinessHoursSection from '@/components/section/business-hour-section'
import PaymentMethodsSection from '@/components/section/payment-method-section'
import { getStoreByIDV1 } from '@/service/flyfood-api/service'
import { redirect } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Phone, Star } from 'lucide-react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import ContactSection from '@/components/section/contact-section'

export default async function StorePage({
  params
}: Readonly<{ params: { id: string } }>) {
  const { id } = await params
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const store = await getStoreByIDV1(id as string)

  const score = Number(store.score.toFixed(2)) / 100
  const badgeType = {
    RESTAURANT: 'Restaurante',
    PHARMACY: 'Farmácia',
    TOBBACO: 'Tabacaria',
    MARKET: 'Mercado',
    PUB: 'Bar',
    CONVENIENCE: 'Conveniência'
  }
  store.isOpen = true

  return (
    <>
      <LoggedHeader session={session} />
      <div className='flex flex-col justify-center items-center max-w-6xl mx-auto'>
        <StoreHeader store={store} />
        <div className='w-full bg-background shadow-lg rounded-b-lg p-6'>
          <div className='flex flex-col items-start justify-between mb-6'>
            <div className='flex items-center space-x-2 mb-2 md:mb-0'>
              <Badge
                className={store.isOpen ? 'bg-green-600' : 'bg-red-600'}
                variant={store.isOpen ? 'default' : 'destructive'}
              >
                {store.isOpen ? 'Aberto' : 'Fechado'}
              </Badge>
              {badgeType[store.type] && (
                <Badge className='bg-red-500' variant='default'>
                  {badgeType[store.type]}
                </Badge>
              )}
              <div className="flex flex-row justify-between items-center space-x-1">
                <Star size={18} color="#fcbb00" fill="#fcbb00" />
                <p className="text-[#fcbb00] font-medium">
                  {score}
                </p>
                <Drawer>
                  <DrawerTrigger>Mais informações</DrawerTrigger>
                  <DrawerContent className="bg-white max-h-[75vh]">
                    <DrawerHeader>
                      <DrawerTitle>Sobre a {store.name}</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex-1 overflow-y-auto space-y-4 m-4">
                      <AddressSection address={store.address} />
                      <BusinessHoursSection businessHours={store.businessHours} />
                      <PaymentMethodsSection paymentMethods={store.paymentMethods} />
                      <ContactSection store={store}/>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
          <ProductSearch />
        </div>
      </div>
    </>
  )
}
