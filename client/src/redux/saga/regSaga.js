import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserAC } from '../actionCreators/loginFormAC';
import { SAGA_FETCH_REG } from '../actionTypes/actionType';

const fetchUsers = async (user) => {
  const { email, name, phone, password, action, method } = user.action;
  console.log('SSSSSSSSSSSSSS0', Object.keys(user.action));
  const res = await fetch(action, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      name: name,
      phone: phone,
      password: password,
    }),
  });
  const resJson = await res.json();
  return resJson;
};

function* workerUsers(action) {
  try {
    const user = yield call(fetchUsers, action);
    yield put(getUserAC(user));
  } catch (err) {
    console.error(err);
  }
}

export function* regSaga() {
  yield takeEvery(SAGA_FETCH_REG, workerUsers);
}
