import createSagaMiddleware from "redux-saga";
import {
  createStore,
  compose,
  applyMiddleware,
  Store,
  Middleware,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from "@react-native-community/async-storage";

import rootReducer from "./ducks/rootReducer";
import rootSaga from "./ducks/rootSaga";
import { ProductsState } from "./ducks/products/types";
import { CategoriesState } from "./ducks/categories/types";
import { RepositoriesState } from "./ducks/repositories/types";
import { AuthenticationState } from "./ducks/authentication/types";
import { ProfileState } from "./ducks/profile/types";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export interface ApplicationState {
  repositories: RepositoriesState;
  products: ProductsState;
  categories: CategoriesState;
  authentication: AuthenticationState;
  profile: ProfileState;
}

const middlewares: Middleware[] = [];

const sagaMonitor =
  __DEV__ && typeof console.tron !== "undefined"
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const composer =
  __DEV__ && typeof console.tron !== "undefined"
    ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
    : composeWithDevTools(applyMiddleware(...middlewares));

const configureStore = () => {
  const store: Store<ApplicationState> = createStore(
    persistedReducer,
    composer
  );

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  store.subscribe((store) => {
    console.log("Redux:", store);
  });

  return { persistor, store };
};

export default configureStore;
