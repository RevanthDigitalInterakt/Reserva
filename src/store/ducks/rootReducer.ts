import { combineReducers } from 'redux';

import repositories from './repositories';
import products from './products';
import categories from './categories';
import authentication from './authentication';
import profile from './profile';

export default combineReducers({
    repositories,
    products,
    categories,
    authentication,
    profile
});
