import { Badge } from '@/components/ui/badge';
import type { Store } from '@/service/flyfood-api/types';
import { Phone, Star } from 'lucide-react';

interface StoreInfoProps {
  store: Store;
}

export default function StoreInfo({ store }: StoreInfoProps) {
  const score = Number(store.score.toFixed(2)) / 100;
  return (
    <div className="flex flex-wrap items-center justify-between mb-6">
      <div className="flex items-center space-x-2 mb-2 md:mb-0">
        <Badge variant={store.isOpen ? 'default' : 'destructive'}>
          {store.isOpen ? 'Aberto' : 'Fechado'}
        </Badge>
        <Badge variant="secondary">{store.type}</Badge>
        <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
          <Star className="w-4 h-4 mr-1" />
          <span>{score}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Phone className="w-4 h-4 mr-2" />
        <span>{store.phone}</span>
      </div>
    </div>
  );
}
