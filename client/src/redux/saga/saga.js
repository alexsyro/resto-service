import { all } from 'redux-saga/effects';
import { regSaga } from './regSaga';
import { loginSaga } from './loginSaga';


export function* rootSaga() {
  yield all([regSaga(), loginSaga()]);
}
