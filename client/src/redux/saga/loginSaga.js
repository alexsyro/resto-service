import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserAC } from '../actionCreators/loginFormAC';
import { SAGA_FETCH_LOGIN } from '../actionTypes/actionType';


const fetchUsers = async (user) => {
  const {email, password } = user.action;
  const res = fetch('http://localhost:1234/login', {
    method: 'POST',
    credential: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      credentials: email.value,
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

export function* loginSaga() {
  yield takeEvery(SAGA_FETCH_LOGIN, workerUsers)
}
