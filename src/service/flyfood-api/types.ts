import type { ApiError } from '@/utils/http'

export type FlyFoodError = ApiError & {
  traceID: string
  error: string
  details?: unknown
  debug?: unknown
}

export type FlyFoodFieldError = {
  field: string
  input: string
  message: string
  debug?: string
}

export type FlyFoodValidationError = Omit<FlyFoodError, 'details'> & {
  details: FlyFoodFieldError[]
}

export type Pagination<T> = {
	data: T[],
  currentPage: number,
  pageSize: number,
  totalPages: number,
  totalItems: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean
}

export type StoreType =
  | 'RESTAURANT'
  | 'PHARMACY'
  | 'TOBBACO'
  | 'MARKET'
  | 'PUB'
  | 'CONVENIENCE'

export const storeTypeTranslation: Record<StoreType, string> = {
  CONVENIENCE: 'Conveniência',
  MARKET: 'Mercado',
  PHARMACY: 'Farmácia',
  PUB: 'Bar',
  RESTAURANT: 'Restaurante',
  TOBBACO: 'Tabacaria'
}

export type PaymentMethod = 'CREDIT' | 'DEBIT' | 'PIX' | 'CASH' | 'BTC'

export const paymentMethodTranslation = {
  CREDIT: "Cartão de Crédito",
  DEBIT: "Cartão de Débito",
  PIX: "PIX",
  CASH: "Dinheiro",
  BTC: "Bitcoin"
}

export type ProductType = 'FOOD' | 'WATER'

export type Address = {
  name: string
  addressLine1: string
  addressLine2: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  latitude: string
  longitude: string
  country: string
}

export type Customer = {
  id: number
  name: string
  lastName: string
  cpf: string
  email: string
  phone: string
  addresses: Address[]
  ordersID: string[]
}

export type BusinessHours = {
  weekDay: number
  openingTime: string
  closingTime: string
}

export type QueryStore = {
  id: string
  name: string
  description: string
  isOpen: boolean
  phone: string
  score: number
  address: Address
  type: StoreType
  deliveryTime: number
  profileImage: string
  headerImage: string
  businessHours: BusinessHours[]
  paymentMethods: PaymentMethod[]
  products: Product[]
}

export type QueryStoreList = {
  id: string
  name: string
  isOpen: boolean
  score: number
  neighborhood: string
  type: StoreType
  deliveryTime: number
  profileImage: string
}

export type GetStoresByFilterInput = {
  name?: string
  range?: number
  city: string
  isOpen?: boolean
  score?: number
  type?: StoreType
  page: number
  maxItems: number
}

export type QueryOwnerStoreList = {
  id: string
  name: string
  active: boolean
  isOpen: boolean
  score: number
  type: StoreType
  profileImage?: string
  city: string
  state: string
  country: string
}

export type QueryOwnerStore = {
  id: string
  name: string
  description: string
  isOpen: boolean
  phone: string
  score: number
  address: Address
  type: StoreType
  profileImage?: string
  headerImage?: string
  businessHours: BusinessHours[]
  paymentMethods: PaymentMethod[]
  products: Product[]
}

export type Product = {
  id: string
  storeId: string
  SKU: string
  active: boolean
  promoActive: boolean
  type: ProductType
  tag: string
  name: string
  description: string
  stockQuantity?: number
  score: number
  image?: string
  details?: Record<string, unknown>
  price: number
  promotionalPrice: number
}
