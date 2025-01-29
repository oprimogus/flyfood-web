import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
  } from '@/components/ui/drawer'
  import AddressSection from '@/components/section/address-section'
  import BusinessHoursSection from '@/components/section/business-hour-section'
  import PaymentMethodsSection from '@/components/section/payment-method-section'
  import ContactSection from '@/components/section/contact-section'
  import { Store } from '@/service/flyfood-api/types'
  
  export function StoreInfoDrawer({ store }: { store: Store }) {
    return (
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
            <ContactSection store={store} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
  
  