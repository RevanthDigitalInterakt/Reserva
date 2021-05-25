import { combineReducers } from 'redux'

import products from './products'
import product from './product'
import categories from './categories'
import authentication from './authentication'
import profile from './profile'

export default combineReducers({
  products,
  product,
  categories,
  authentication,
  profile,
})
