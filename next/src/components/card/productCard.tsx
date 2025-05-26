import type { Product } from '@/service/flyfood-api/types'
import { formatCurrency } from '@/utils/utils'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div
      key={product.id}
      className='card card-side h-32 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-200 overflow-hidden'
    >
      <figure className='w-32 relative overflow-hidden'>
        {product.image ? (
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            className='object-cover w-full h-full hover:scale-110 transition-transform duration-500'
            width={64}
            height={64}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-focus'>
            <ShoppingBag className='w-16 h-16 text-primary-content animate-pulse' />
          </div>
        )}
      </figure>
      <div className='card-body p-3 relative'>
        {product.promoActive && (
          <div className='badge badge-secondary badge-sm absolute -top-1 -right-1 z-10'>
            Promoção
          </div>
        )}
        <h4 className='card-title text-base font-bold line-clamp-1'>
          {product.name}
        </h4>
        <p className='text-xs text-base-content/70 line-clamp-2'>
          {product.description}
        </p>
        <div className='flex justify-between items-center mt-auto'>
          {product.promoActive ? (
            <div className='flex flex-col'>
              <span className='text-xs line-through text-base-content/50'>
                {formatCurrency(product.price)}
              </span>
              <span className='text-lg font-bold text-secondary'>
                {formatCurrency(product.promotionalPrice)}
              </span>
            </div>
          ) : (
            <span className='text-lg font-bold text-primary'>
              {formatCurrency(product.price)}
            </span>
          )}
          <button type='button' className='btn btn-circle btn-primary btn-sm'>
            <ShoppingBag className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  )
}
