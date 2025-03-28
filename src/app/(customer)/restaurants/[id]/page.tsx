import { auth } from '@/app/auth'
import { flyFoodApi } from '@/service/flyfood-api/service'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { StoreIcon, Clock, MapPin, Phone, Star, ShoppingBag, Info, CreditCard, ChevronRight } from 'lucide-react'
import { BusinessHours, paymentMethodTranslation, Product, QueryStore, storeTypeTranslation } from '@/service/flyfood-api/types'
import { formatCurrency, formatRating } from '@/utils/utils'
import ProductCard from '@/components/card/productCard'

type RestaurantPageProps = {
    params: { id: string }
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
    await params
    const { id } = params
    const session = await auth()
    if (!session) {
        redirect('/')
    }
    const result = await flyFoodApi.getStoreByIDV1(session, id)
    if (!result.ok) {
        redirect('/404')
    }
    const store = result.value
    console.log(store)

    // Função para formatar horários de funcionamento
    const formatBusinessHours = (businessHours: BusinessHours[]) => {
        const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
        return businessHours.map(hour => `${days[hour.weekDay]}: ${hour.openingTime} - ${hour.closingTime}`)
    }

    // Agrupar produtos por categoria (tag)
    const productsByCategory = store.products.reduce((acc, product) => {
        if (!acc[product.tag]) {
            acc[product.tag] = []
        }
        acc[product.tag].push(product)
        return acc
    }, {} as Record<string, Product[]>)

    return (
        <div className="min-h-screen bg-base-200">
            {/* Banner e Logo */}
            <div className="relative w-full h-52">
                {/* Banner */}
                <div className="w-full h-full relative">
                    {store.headerImage ? (
                        <Image
                            src={store.headerImage}
                            alt={store.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-primary"></div>
                    )}
                </div>

                {/* Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-40">
                    <div className="w-20 h-20 rounded-full mb-12 border-4 border-white bg-white overflow-hidden">
                        {store.profileImage ? (
                            <Image
                                src={store.profileImage}
                                alt={store.name}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full bg-primary flex items-center justify-center">
                                <StoreIcon className="w-12 h-12 text-white" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Informações da Loja */}
            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="rounded-xl bg-white shadow-md overflow-hidden">

                    {/* Informações da Loja */}
                    <div className="pt-4 pb-2 px-4">
                        {/* Nome da Loja e Distância */}
                        <div className="flex-1 mb-2">
                            <div className="flex-1">
                                <details className="collapse collapse-arrow">
                                    <summary className="collapse-title text-xl font-bold">
                                        {store.name}
                                    </summary>
                                    <div className="collapse-content text-sm">
                                        <div className="join join-vertical w-full">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* Endereço */}
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-5 h-5 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="font-semibold">Endereço</h3>
                                                        <p>{store.address.addressLine1}, {store.address.addressLine2}</p>
                                                        <p>{store.address.neighborhood}, {store.address.city} - {store.address.state}</p>
                                                    </div>
                                                </div>

                                                {/* Contato */}
                                                <div className="flex items-start gap-2">
                                                    <Phone className="w-5 h-5 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="font-semibold">Contato</h3>
                                                        <p>{store.phone}</p>
                                                    </div>
                                                </div>

                                                {/* Tempo de entrega */}
                                                <div className="flex items-start gap-2">
                                                    <Clock className="w-5 h-5 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="font-semibold">Tempo de entrega</h3>
                                                        <p>Aprox. {store.deliveryTime} minutos</p>
                                                    </div>
                                                </div>

                                                {/* Horário de funcionamento */}
                                                <div className="flex items-start gap-2">
                                                    <Clock className="w-5 h-5 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="font-semibold">Horário de funcionamento</h3>
                                                        <ul className="mt-1">
                                                            {formatBusinessHours(store.businessHours).map((hour, index) => (
                                                                <li key={index}>{hour}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Formas de pagamento */}
                                                <div className="flex items-start gap-2">
                                                    <CreditCard className="w-5 h-5 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="font-semibold">Formas de pagamento</h3>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {store.paymentMethods.map(method => (
                                                                <div key={method} className="badge badge-outline">
                                                                    {paymentMethodTranslation[method]}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>

                        </div>

                        {/* Separador */}
                        <div className="border-t border-gray-200 my-2"></div>

                        {/* Avaliações */}
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-1'>
                                <Star className="w-4 h-4 text-warning" fill="currentColor" />
                                <span className="ml-1 font-bold">{formatRating(store.score)}</span>
                            </div>
                            <span className="text-gray-500 ml-1">(790 avaliações)</span>
                        </div>

                        {/* Separador */}
                        <div className="border-t border-gray-200 my-2"></div>

                        {/* Entrega */}
                        <div className="flex items-center justify-between">
                            <div className="font-bold">Entrega</div>
                            <span className="text-gray-700">{}Hoje, {store.deliveryTime} min</span>
                        </div>
                    </div>
                </div>

                {/* Menu de produtos */}
                <div className="mt-8">
                    <h2 className="text-2xl text-center font-bold mb-4">Cardápio</h2>

                    {/* Sticky category navigation */}
                    {Object.keys(productsByCategory).length > 0 && (
                        <div className="sticky top-0 z-20 bg-base-100 pt-2 pb-2 shadow-sm">
                            <div className="flex overflow-x-auto gap-2 pb-1 px-4 scrollbar-hide">
                                {Object.keys(productsByCategory).map(category => (
                                    <a key={category} href={`#category-${category}`}
                                        className="btn btn-sm btn-primary btn-outline whitespace-nowrap">
                                        {category}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    {Object.entries(productsByCategory).map(([category, products]) => (
                        <div className="collapse collapse-open" key={category}>
                            <div id={`category-${category}`} className="collapse-title font-semibold mb-8 scroll-mt-16">
                                <div className="flex items-center gap-3 my-4">
                                    <h3 className="text-xl font-bold">{category}</h3>
                                    <div className="flex-1 h-px bg-base-300"></div>
                                    <span className="text-sm text-base-content/70">{products.length} itens</span>
                                </div>
                            </div>
                            <div className="collapse-content text-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {products.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Caso não tenha produtos */}
                    {store.products.length === 0 && (
                        <div className="card bg-base-100 shadow-md mb-8 py-2 text-center">
                            <Info className="w-12 h-12 text-info mx-auto" />
                            <h3 className="text-xl font-bold mb-2">Em breve</h3>
                            <p className="text-base-content/70">Este estabelecimento ainda não cadastrou produtos no cardápio.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating cart button */}
            <div className="fixed bottom-4 right-4 z-30">
                <button className="btn btn-primary btn-circle shadow-lg">
                    <ShoppingBag className="w-6 h-6" />
                </button>
            </div>
        </div >
    )
}