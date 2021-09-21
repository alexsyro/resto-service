import { all } from 'redux-saga/effects';
import { categoryListSaga } from './categoryListSaga';
import { dishSaga } from './dishSaga';
import watcherUserSaga from './userSaga';

export function* rootSaga() {
  yield all([categoryListSaga(), dishSaga(), watcherUserSaga()]);
}
