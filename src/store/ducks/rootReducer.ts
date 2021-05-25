import { combineReducers } from 'redux'

import products from './products'
import wishlist from './wishlist'
import categories from './categories'
import authentication from './authentication'
import profile from './profile'
import address from './address'

export default combineReducers({
  products,
  wishlist,
  categories,
  authentication,
  profile,
  address,
})
