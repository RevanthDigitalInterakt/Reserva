import { createStore, applyMiddleware, Store } from "redux";

import rootReducer from "./ducks/rootReducer";
import rootSaga from "./ducks/rootSaga";

import { persistStore, persistReducer } from "redux-persist";

import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";
import { ProductsState } from "./ducks/products/types";

import AsyncStorage from "@react-native-community/async-storage";
import { CategoriesState } from "./ducks/categories/types";
import { AuthenticationState } from "./ducks/authentication/types";
import { ProfileState } from "./ducks/profile/types";
import { AddressState } from './ducks/address/types';
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export interface ApplicationState {
  products: ProductsState;
  categories: CategoriesState;
  address: AddressState;
  authentication: AuthenticationState;
  profile: ProfileState;
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
