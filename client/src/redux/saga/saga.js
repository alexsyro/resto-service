import { all } from 'redux-saga/effects';
import { regSaga } from './regSaga';
import { loginSaga } from './loginSaga';
import { categoryListSaga } from './categoryListSaga';
import {dishSaga} from './dishSaga'


export function* rootSaga() {
  yield all([regSaga(), loginSaga(), categoryListSaga(), dishSaga()]);
}
