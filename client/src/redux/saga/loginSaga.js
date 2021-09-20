import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserAC } from '../actionCreators/loginFormAC';
import { SAGA_FETCH_LOGIN } from '../actionTypes/actionType';

const fetchUsers = async (action) => {
  const { email, password } = action.payload;
  console.log(email, password);
  const res = await fetch('http://localhost:1234/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      credentials: email,
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

export function* loginSaga() {
  yield takeEvery(SAGA_FETCH_LOGIN, workerUsers);
}
