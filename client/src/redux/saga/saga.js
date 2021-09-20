import { all } from 'redux-saga/effects';
import { regSaga } from './regSaga';
import { loginSaga } from './loginSaga';
import { categoryListSaga } from './categoryListSaga';


export function* rootSaga() {
  yield all([regSaga(), loginSaga(), categoryListSaga()]);
}
