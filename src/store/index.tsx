import { createStore, applyMiddleware, Store } from 'redux';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';

import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import { ProductsState } from './ducks/products/types';

import AsyncStorage from '@react-native-community/async-storage';
import { CategoriesState } from './ducks/categories/types';
import { AuthenticationState } from './ducks/authentication/types';
import { ProfileState } from './ducks/profile/types';
import { ProductState } from './ducks/product/types';
import { LocalitiesState } from './ducks/localities/types';

import { AddressState } from './ducks/address/types';
import { FilterState } from './ducks/filter/types';

import { WishlistState } from './ducks/wishlist/types';
import { NearbyStoresState } from './ducks/nearbyStores/types';
import { ShippingMethodState } from './ducks/shippingMethod/types';
import { OrdersState } from './ducks/orders/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export interface ApplicationState {
  filter: FilterState;
  products: ProductsState;
  wishlist: WishlistState;
  product: ProductState;
  categories: CategoriesState;
  authentication: AuthenticationState;
  profile: ProfileState;
  shippingMethod: ShippingMethodState;
  nearbyStores: NearbyStoresState;
  address: AddressState;
  localities: LocalitiesState;
  orders: OrdersState;
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store: Store<ApplicationState> = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { persistor, store };
};

export default configureStore;
