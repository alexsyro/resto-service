import { call, put, takeEvery } from 'redux-saga/effects';
import { getDishAC } from '../actionCreators/dishAC';
import { SAGA_FETCH_DISH } from '../actionTypes/actionType';

const fetchDish = async (action) => {
  console.log(action.payload);
  const res = await fetch('http://localhost:1234/api/menu/categories/' + action.payload, {
    credentials: 'include',
  });
  const dishes = await res.json();
  return dishes;
};

function* workerDish(action) {
  try {
    const dish = yield call(fetchDish, action);
    yield put(getDishAC(dish));
  } catch (err) {
    console.error(err);
  }
}

export function* dishSaga() {
  yield takeEvery(SAGA_FETCH_DISH, workerDish);
}
