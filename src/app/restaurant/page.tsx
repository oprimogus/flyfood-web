import LoggedHeader from '@/components/header/logged-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { getStoreByV1 } from '@/service/flyfood-api/service'
import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default async function RestaurantListPage() {
    const session = await auth()
    if (!session) {
        redirect('/')
    }
    const store = await getStoreByV1('01936140-316e-7633-820a-65e02171cb19')
    const stores = [
        store,
        { ...store, id: '01936140-316e-7633-820a-65e02171cb20' },
        { ...store, id: '01936140-316e-7633-820a-65e02171cb21' },
        { ...store, id: '01936140-316e-7633-820a-65e02171cb22' },
        // { ...store, id: '01936140-316e-7633-820a-65e02171cb23' },
        // { ...store, id: '01936140-316e-7633-820a-65e02171cb24' },
        // { ...store, id: '01936140-316e-7633-820a-65e02171cb25' },
    ]
    const badgeType = {
        RESTAURANT: 'Restaurante',
        PHARMACY: 'Farmácia',
        TOBBACO: 'Tabacaria',
        MARKET: 'Mercado',
        PUB: 'Bar'
    }
    return (
        <>
            <LoggedHeader session={session} />
            <Card className='flex flex-col items-center justify-center py-8'>
                <CardHeader>
                    <CardTitle>Restaurantes disponíveis na sua região:</CardTitle>
                </CardHeader>
                <CardContent className='w-full h-full'>
                    {stores && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                            {stores.map((store) => (
                                <Card
                                    className=' hover:rounded-xl hover:border hover:bg-card hover:text-card-foreground hover:shadow'
                                    key={store.id}
                                >
                                    <CardContent className='w-full p-4 flex flex-row'>
                                        <Avatar className='w-24 h-24 border-white'>
                                            <AvatarImage src={store.profileImage} alt={store.name} />
                                            <AvatarFallback>
                                                {store.name.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col px-4'>
                                            <h1 className='font-bold text-lg'>{store.name}</h1>
                                            <div className='flex items-center space-x-2 mt-2'>
                                                <div className='flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded'>
                                                    <Star className='w-4 h-4 mr-1' />
                                                    <span>{Number(store.score.toFixed(2)) / 100}</span>
                                                </div>
                                                {badgeType[store.type] && (
                                                    <Badge className='bg-red-500' variant='default'>
                                                        {badgeType[store.type]}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>

                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

        </>
    )
}