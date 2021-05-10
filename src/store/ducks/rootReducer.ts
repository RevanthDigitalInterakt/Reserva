import { combineReducers } from 'redux';

import repositories from './repositories';
import products from './products';

export default combineReducers({
    repositories,
    products
});