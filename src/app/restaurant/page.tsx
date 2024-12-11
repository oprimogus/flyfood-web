import LoggedHeader from '@/components/header/logged-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { getStoreByV1 } from '@/service/flyfood-api/service'
import React from 'react'

export default async function RestaurantListPage() {
    const store = await getStoreByV1('01936140-316e-7633-820a-65e02171cb19')
    const stores = [store, store]
    return (
        <>
            <LoggedHeader />
            <Card className='flex flex-col items-center justify-center py-8'>
                <CardHeader>
                    <CardTitle>Restaurantes disponíveis na sua região:</CardTitle>
                </CardHeader>
                {stores && (
                    <ul>
                        {stores.map((store) => (
                            <li
                                className='p-1'
                                key={store.id}>
                                <Card className='flex flex-col items-center justify-center py-8'>
                                    <CardContent>
                                        <div className='flex flex-row justify-center items-center'>
                                            <Avatar className='w-24 h-24 border-4 border-white mr-4'>
                                                <AvatarImage src={store.profileImage} alt={store.name} />
                                                <AvatarFallback>
                                                    {store.name.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className='flex flex-col'>
                                                <h1><strong>{store.name}</strong></h1>
                                                <h3>{store.description}</h3>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

        </>
    )
}