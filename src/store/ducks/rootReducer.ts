import { combineReducers } from 'redux';

import repositories from './repositories';
import products from './products';
import categories from './categories';
import address from './address';

export default combineReducers({
    repositories,
    products,
    categories,
    address
});
