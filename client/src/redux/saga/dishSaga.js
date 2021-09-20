import { call, put, takeEvery } from 'redux-saga/effects';
import { getDishAC } from '../actionCreators/dishAC';
import { SAGA_FETCH_DISH } from '../actionTypes/actionType';

const fetchDish = async (payload) => {
  console.log(payload, 'FECTH ACTION <_________-----------------');
  console.log(payload.categoryId);

  // fetch('http://localhost:1234/api/menu/categories/' + categoryId)
  const res = await fetch('http://localhost:1234/api/menu/categories/' + payload.categoryId)
  const resJson = await res.json()
  return resJson;
  //   .then((res) => res.json())
  //   .then((categories) => dispatch({ type: GET_DISHES, payload: categories }))
}


function* workerDish(payload) {
  console.log('WORKERDISH', payload)
  try {
    const dish = call(fetchDish, payload)
    yield put(getDishAC(dish))
  } catch (err) {
    console.error(err)
  }
}

export function* dishSaga() {
  yield takeEvery(SAGA_FETCH_DISH, workerDish)
}
