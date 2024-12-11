import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PaymentMethod } from '@/service/flyfood-api/types'
import { CreditCard } from 'lucide-react'

interface PaymentMethodsSectionProps {
  paymentMethods: PaymentMethod[]
}

export default function PaymentMethodsSection({
  paymentMethods
}: Readonly<PaymentMethodsSectionProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <CreditCard className='w-5 h-5 mr-2' />
          Formas de pagamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-wrap gap-2'>
          {paymentMethods.map((method) => (
            <li
              key={method}
              className='bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm'
            >
              {method}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
