import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from '@redux-saga/core';
// import { loginSaga } from './saga/loginSaga';
// import { regSaga } from './saga/regSaga';
import { rootSaga } from './saga/saga';

// создаём саму middleware
const saga = createSagaMiddleware();

// монтируем middleware в store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(saga)));

// запускаем слежение action
// saga.run(loginSaga);
// saga.run(regSaga);
saga.run(rootSaga);

export default store;
