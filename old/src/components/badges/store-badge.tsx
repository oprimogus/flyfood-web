import { Badge } from '@/components/ui/badge'
import { QueryStore, StoreType } from '@/service/flyfood-api/types'

const badgeType: Record<StoreType, string> = {
  RESTAURANT: 'Restaurante',
  PHARMACY: 'Farmácia',
  TOBBACO: 'Tabacaria',
  MARKET: 'Mercado',
  PUB: 'Bar',
  CONVENIENCE: 'Conveniência'
}

const badgeColors: Record<StoreType, string> = {
  RESTAURANT: 'bg-orange-500',
  PHARMACY: 'bg-green-500',
  TOBBACO: 'bg-yellow-500',
  MARKET: 'bg-blue-500',
  PUB: 'bg-purple-500',
  CONVENIENCE: 'bg-indigo-500'
}

export function StoreBadges({ store }: { store: QueryStore }) {
  return (
    <div className="flex items-center space-x-2 mb-2 md:mb-0">
      <Badge
        className={store.isOpen ? 'bg-green-600' : 'bg-red-600'}
        variant={store.isOpen ? 'default' : 'destructive'}
      >
        {store.isOpen ? 'Aberto' : 'Fechado'}
      </Badge>
      {badgeType[store.type] && (
        <Badge className={badgeColors[store.type]} variant="default">
          {badgeType[store.type]}
        </Badge>
      )}
    </div>
  )
}

