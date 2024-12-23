'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Store as StoreIcon, Star } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import Link from 'next/link'
import { useSelectedAddress, useStores } from '@/hooks/use-api'

export default function StoreList() {
  const { selectedAddress } = useSelectedAddress();
  const { storeList, isError, isLoading } = useStores({
    city: selectedAddress?.city as string,
    page: 1,
    maxItems: 10,
  });

  const badgeType = {
    RESTAURANT: 'Restaurante',
    PHARMACY: 'Farmácia',
    TOBBACO: 'Tabacaria',
    MARKET: 'Mercado',
    PUB: 'Bar',
    CONVENIENCE: 'Conveniência'
  };

  if (isLoading) {
    return <div className="w-full text-center py-8">Carregando...</div>;
  }

  if (isError) {
    return <div className="w-full text-center py-8 text-red-500">Erro ao carregar os dados.</div>;
  }

  return (
    <>
      <h1 className='flex flex-row items-center justify-center mt-8 text-xl font-bold'>Lojas disponíveis na sua região</h1>
      <div className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 [&>*]:col-[span_1/auto]">
        {storeList?.map((store) => (
            <Link href={`/restaurants/${store.id}`} key={store.id} className="block">
              <div className="h-full shadow-lg transition-shadow duration-200">
                <div className='p-4 flex flex-row items-center text-center space-y-4'>
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-white">
                    <AvatarImage src={store.profileImage ?? null} alt={store.name} />
                    <AvatarFallback className="text-lg">
                      <div className="w-full h-full bg-gradient-to-r from-red-200 to-red-500 flex items-center justify-center">
                        <StoreIcon className="w-14 h-14 text-white" />
                      </div>
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-center space-y-2 w-full">
                    <h1 className="text-lg font-medium line-clamp-2">{store.name}</h1>
                    <div className="flex flex-col items-center space-y-1">
                      <div className="flex items-center space-x-1">
                        <Star size={18} color="#fcbb00" fill="#fcbb00" />
                        <p className="text-[#fcbb00] font-medium">
                          {Number(store.score.toFixed(2)) / 100}
                        </p>
                        <span className="text-sm text-gray-600">
                          - {badgeType[store.type]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              {/* <Card className="h-full hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4 flex flex-row items-center text-center space-y-4">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-white">
                <AvatarImage src={store.profileImage ?? null} alt={store.name} />
                <AvatarFallback className="text-lg">
                  <div className="w-full h-full bg-gradient-to-r from-red-200 to-red-500 flex items-center justify-center">
                    <StoreIcon className="w-14 h-14 text-white" />
                  </div>
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col items-center space-y-2 w-full">
                <h1 className="text-lg font-medium line-clamp-2">{store.name}</h1>
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex items-center space-x-1">
                    <Star size={18} color="#fcbb00" fill="#fcbb00" />
                    <p className="text-[#fcbb00] font-medium">
                      {Number(store.score.toFixed(2)) / 100}
                    </p>
                    <span className="text-sm text-gray-600">
                    - {badgeType[store.type]}
                  </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
            </Link>

        ))}
      </div>
    </>

  );
}