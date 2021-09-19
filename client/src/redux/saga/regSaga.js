import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserAC } from '../actionCreators/loginFormAC';
import { SAGA_FETCH_REG } from '../actionTypes/actionType';


const fetchUsers = async (user) => {
  const { email, login, phone, password, action, method } = user.action;
  const res = fetch(action, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.value,
      login: login.value,
      phone: phone.value,
      password: password.value
    })
  })
  const resJson = res.json();
  return resJson;
}

function* workerUsers(action) {
  try {
    const user = yield call(fetchUsers, action)
    yield put(getUserAC(user))
  } catch (err) {
    console.error(err)
  }
}

export function* regSaga() {
  yield takeEvery(SAGA_FETCH_REG, workerUsers)
}
