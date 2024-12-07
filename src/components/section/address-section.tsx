import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Address } from '@/service/flyfood-api/types';
import { MapPin } from 'lucide-react';

interface AddressSectionProps {
  address: Address;
}

export default function AddressSection({ address }: AddressSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Endereço
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          {address.addressLine1} {address.addressLine2}
        </p>
        <p>
          {address.neighborhood},{' '}
          {`${address.city}, ${address.state} ${address.postalCode}`}
        </p>
      </CardContent>
    </Card>
  );
}
