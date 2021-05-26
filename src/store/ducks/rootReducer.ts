import { combineReducers } from 'redux';

import products from './products';
import categories from './categories';
import authentication from './authentication';
import profile from './profile';
import address from './address';
import shippingMethod from './shippingMethod';
import nearbyStores from './nearbyStores';

export default combineReducers({
  products,
  categories,
  authentication,
  profile,
  address,
  shippingMethod,
  nearbyStores,
});
