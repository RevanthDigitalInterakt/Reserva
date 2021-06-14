import { Cashback } from './../../modules/Cashback/pages/Cashback'
import { combineReducers } from 'redux'

import shippingMethod from './shippingMethod'
import nearbyStores from './nearbyStores'
import filter from './filter'
import products from './products'
import product from './product'
import categories from './categories'
import authentication from './authentication'
import profile from './profile'
import localities from './localities'
import address from './address'
import wishlist from './wishlist'
import orders from './orders'
import cashback from './cashback'

export default combineReducers({
  products,
  product,
  wishlist,
  categories,
  authentication,
  profile,
  address,
  shippingMethod,
  nearbyStores,
  localities,
  filter,
  orders,
  cashback,
})
