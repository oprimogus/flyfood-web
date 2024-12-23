import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import LoggedHeader from '@/components/header/logged-header'
import StoreList from '@/components/list/store-list'

export default async function RestaurantListPage() {
    const session = await auth()
    if (!session) {
        redirect('/')
    }
    return (
        <>
            <LoggedHeader session={session} />
            <StoreList/>
            {/* <Card className='flex flex-col items-center justify-center mt-8 mx-4'>
                <CardHeader>
                    <CardTitle>Restaurantes disponíveis na sua região:</CardTitle>
                </CardHeader>
                <CardContent className='w-full h-full'>
                    <StoreList/>
                </CardContent>

                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card> */}

        </>
    )
}