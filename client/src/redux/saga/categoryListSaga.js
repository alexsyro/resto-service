import { call, put, takeEvery } from 'redux-saga/effects';
import {getCategoryListAC} from '../actionCreators/categoryListAC'
import {SAGA_FETCH_CATEGORYLIST} from '../actionTypes/actionType'

const fetchCategoryList = async () => {
  const res = await fetch('http://localhost:1234/api/menu/categories')
  const resJson = await res.json();
  return resJson;
}

function* workerCategoryList() {
  try {
    const categoryList = yield call(fetchCategoryList)
    yield put(getCategoryListAC(categoryList))
  } catch (err) {
    console.error(err)
  }
}

export function* categoryListSaga() {
  yield takeEvery(SAGA_FETCH_CATEGORYLIST, workerCategoryList)
}
