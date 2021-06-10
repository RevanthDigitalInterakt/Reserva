import { Product } from '../product/types'
import { Profile } from '../profile/types'

export enum OrdersTypes {
  ORDER_REQUEST = '@orders/ORDERS_REQUEST',
  ORDER_SUCCESS = '@orders/ORDERS_SUCCESS',
  ORDER_FAILURE = '@orders/ORDERS_FAILURE',
  ORDER_COUNT_INCREASE = '@orders/ORDER_COUNT_INCREASE',
  SET_ORDERS = '@orders/SET_ORDERS',
  APPEND_ORDERS = '@orders/APPEND_ORDERS',
  REMOVE_ORDERS = '@orders/REMOVE_ORDERS',
  SET_COUPONS = '@orders/SET_COUPONS',
  APPEND_COUPONS = '@orders/APPEND_COUPONS',
  REMOVE_COUPONS = '@orders/REMOVE_COUPONS',
}

export interface OrdersState {
  orders: [Product & OrderItems]
  coupons: CouponsOrders[]
  loading: boolean
  error: boolean
}

export enum PaymentType {
  CREDIT_CARD = 'creditCard',
  PIX = 'pix',
  BOLETO = 'boleto',
  GIFT_CARD = 'giftcard',
}

export type CreditCard = {
  id: string
  last_four_digits: string
  holder_name: string
  exp_month: number
  exp_year: number
}

// export type Profile = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   receiveEmail: string;
//   gender: string;
//   fullName: string;
//   rsvCPF: string;
//   rsvBirthDate: string;
//   rsvPhoneNumber: string;
// }

export type OrderItems = {
  sku?: string
  quantity?: number
  title?: string
  description?: string
  size?: string
  color?: string
  imagesUrls?: string[]
}

export type ShippingMethod = {
  id: number
  name: string
  value: number
}

export type ShippingAddress = {
  id?: string
  country?: string
  lastName?: string
  address3?: string
  city?: string
  address2?: string
  prefix?: string
  address1?: string
  postalCode?: string
  jobTitle?: string
  companyName?: string
  county?: string
  suffix?: string
  firstName?: string
  externalAddressId?: string
  phoneNumber?: string
  repositoryId?: string
  faxNumber?: string
  middleName?: string
  state?: string
}

export type CouponsOrders = {
  value: string
}

export interface OrderRequest {
  paymentType: PaymentType
  paymentInfo: {
    creditCard?: CreditCard
  }
  profile: Profile
  items: OrderItems[]
  shippingMethod: ShippingMethod
  shippingAddress: ShippingAddress
  coupons: CouponsOrders[]
}
