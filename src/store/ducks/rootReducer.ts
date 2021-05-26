import { combineReducers } from 'redux';

import products from './products';
import product from './product';
import wishlist from './wishlist';
import categories from './categories';
import authentication from './authentication';
import profile from './profile';
import address from './address';
import localities from './localities';

export default combineReducers({
  products,
  product,
  wishlist,
  categories,
  authentication,
  profile,
  localities,
  address,
});
