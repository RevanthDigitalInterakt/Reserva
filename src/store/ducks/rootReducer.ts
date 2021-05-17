import { combineReducers } from 'redux';

import repositories from './repositories';
import products from './products';
import categories from './categories';

export default combineReducers({
    repositories,
    products,
    categories
});
