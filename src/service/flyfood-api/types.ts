import { ApiError } from "@/service/http"

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

export type StoreType = 'RESTAURANT' | 'PHARMACY' | 'TOBBACO' | 'MARKET' | 'PUB'

export type PaymentMethod = 'CREDIT' | 'DEBIT' | 'PIX' | 'CASH' | 'BTC'

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

export type Store = {
  id: string
  name: string
  description: string
  isOpen: boolean
  phone: string
  score: number
  address: Address
  type: StoreType
  profileImage: string
  headerImage: string
  businessHours: BusinessHours[]
  paymentMethods: PaymentMethod[]
}

export type QueryStore = {
  id: string
  name: string
  isOpen: boolean
  score: number
  neighborhood: string;
  city: string;
  type: StoreType
  profileImage: string
}

export type GetStoresByFilter = {
  name?: string
  city: string
  isOpen?: boolean,
  type?: StoreType
  page: number,
  maxItems: number
}
