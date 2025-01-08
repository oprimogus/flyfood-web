import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Store } from '@/service/flyfood-api/types'
import { Phone } from 'lucide-react'

interface ContactSectionProps {
  store: Store
}

export default function ContactSection({
  store
}: Readonly<ContactSectionProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Phone className='w-4 h-4 mr-2' />
          Contato
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{store.phone}</p>
      </CardContent>
    </Card>
  )
}
