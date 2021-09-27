import { all } from 'redux-saga/effects';
import { dishSaga } from './dishSaga';
import watcherUserSaga from './userSaga';
import categorySaga from './categorySaga';

export function* rootSaga() {
  yield all([categorySaga(), dishSaga(), watcherUserSaga()]);
}
