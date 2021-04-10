import { createStore, applyMiddleware, Store } from 'redux';

import { RepositoriesState } from './ducks/repositories/types';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';

export interface ApplicationState {
	repositories: RepositoriesState;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

export default store;

sagaMiddleware.run(rootSaga);
