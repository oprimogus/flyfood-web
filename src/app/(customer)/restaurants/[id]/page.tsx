import { auth } from '@/app/auth'
import { flyFoodApi } from '@/service/flyfood-api/service'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { StoreIcon, Clock, MapPin, Phone, Star, ShoppingBag, Info, CreditCard } from 'lucide-react'
import { BusinessHours, paymentMethodTranslation, Product, QueryStore, storeTypeTranslation } from '@/service/flyfood-api/types'
import { formatCurrency, formatRating } from '@/utils/utils'

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
            {/* Header da Loja */}
            <div className="relative w-full overflow-hidden h-64">
                {store.headerImage ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={store.headerImage || "/placeholder.svg"}
                            alt={store.name}
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        {/* Store name on image */}
                        <div className="absolute bottom-4 left-4 text-white">
                            <h1 className="text-4xl font-bold drop-shadow-md">{store.name}</h1>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <h1 className="text-4xl text-center font-bold text-white">{store.name}</h1>
                    </div>
                )}
            </div>

            {/* Informações da Loja */}
            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col items-center md:items-start gap-4">
                                {/* Profile image */}
                                <div className="avatar">
                                    <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        {store.profileImage ? (
                                            <Image
                                                src={store.profileImage || "/placeholder.svg"}
                                                alt={store.name}
                                                width={100}
                                                height={100}
                                                className='object-cover w-full h-full rounded-full'
                                            />
                                        ) : (
                                            <div className="bg-primary w-full h-full flex items-center justify-center">
                                                <StoreIcon className="w-18 h-18 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Rating with stars visualization */}
                                <div className="flex items-center gap-1 bg-base-200 px-3 py-1 rounded-full">
                                    <Star className="w-4 h-4 text-warning" fill="currentColor" />
                                    <span className="font-semibold">{formatRating(store.score)}</span>
                                </div>
                            </div>

                            {/* Store details */}
                            <div className="flex-1 space-y-3">
                                <h1 className="text-3xl text-center font-bold">{store.name}</h1>

                                <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                                    <div className="badge badge-primary">{storeTypeTranslation[store.type]}</div>
                                    {store.isOpen ? (
                                        <div className="badge badge-success gap-1">
                                            <span className="inline-block w-2 h-2 rounded-full bg-success-content" />Aberto
                                        </div>
                                    ) : (
                                        <div className="badge badge-error gap-1">
                                            <span className="inline-block w-2 h-2 rounded-full bg-error-content"></span> Fechado
                                        </div>
                                    )}
                                </div>

                                <p className="text-base-content/80">{store.description}</p>

                                {/* Quick info badges */}
                                <div className="flex flex-wrap gap-2">
                                    <div className="badge badge-outline gap-1">
                                        <Clock className="w-3 h-3" /> {store.deliveryTime} min
                                    </div>
                                    <div className="badge badge-outline gap-1">
                                        <MapPin className="w-3 h-3" /> {store.address.city}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informações extras */}
                        <div className="divider my-4" />

                        <div className="join join-vertical w-full">
                            <div className="collapse collapse-arrow join-item border border-base-300">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">
                                    Informações do estabelecimento
                                </div>
                                <div className="collapse-content">
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
                                    </div>
                                </div>
                            </div>

                            <div className="collapse collapse-arrow join-item border border-base-300">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">
                                    Horários e pagamentos
                                </div>
                                <div className="collapse-content">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        <div key={product.id} className="card card-compact bg-base-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-base-200">
                                            <figure className="h-48 relative overflow-hidden">
                                                {product.image ? (
                                                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-base-200">
                                                        <ShoppingBag className="w-12 h-12 text-base-content/30" />
                                                    </div>
                                                )}
                                                {product.promoActive && (
                                                    <div className="absolute top-2 right-2 badge badge-secondary">Promoção</div>
                                                )}
                                            </figure>
                                            <div className="card-body">
                                                <h4 className="card-title text-lg">{product.name}</h4>
                                                <p className="text-sm text-base-content/70 line-clamp-2">{product.description}</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    {product.promoActive ? (
                                                        <div className="flex flex-col">
                                                            <span className="text-sm line-through text-base-content/50">{formatCurrency(product.price)}</span>
                                                            <span className="text-lg font-bold text-primary">{formatCurrency(product.promotionalPrice)}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
                                                    )}

                                                    <button className="btn btn-primary btn-sm gap-2">
                                                        <ShoppingBag className="w-4 h-4" />
                                                        Adicionar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
        </div>
    )
}