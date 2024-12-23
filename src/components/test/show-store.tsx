import StoreHeader from '@/components/header/store-header'
import ProductSearch from '@/components/input/product-search'
import AddressSection from '@/components/section//address-section'
import BusinessHoursSection from '@/components/section/business-hour-section'
import PaymentMethodsSection from '@/components/section/payment-method-section'
import StoreInfo from '@/components/section/store-info'
import { getStoreByIDV1 } from '@/service/flyfood-api/service'

export interface ShowStoreProps {
  id: string
}

export default async function ShowStore({ id }: ShowStoreProps) {
  const store = await getStoreByIDV1(id as string)

  return (
    <div className='flex flex-col justify-center items-center max-w-6xl mx-auto'>
      <StoreHeader store={store} />
      <div className='w-full bg-background shadow-lg rounded-b-lg p-6'>
        <StoreInfo store={store} />
        <ProductSearch />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <AddressSection address={store.address} />
          <BusinessHoursSection businessHours={store.businessHours} />
          <PaymentMethodsSection paymentMethods={store.paymentMethods} />
        </div>
      </div>
    </div>
  )
}
