import { call, put, takeEvery, all } from 'redux-saga/effects';
import { authUserAC, logoutUserAC, clearReservationAC } from '../actionCreators/actionCreators';
import { cartCleanAC } from '../actionCreators/cartAC';
import { SAGA_FETCH_REG, SAGA_FETCH_LOGIN, SAGA_FETCH_LOGOUT } from '../actionTypes/sagaTypes';

const { REACT_APP_URL } = process.env;

// Логин юзера
const fetchLoginUser = async (action) => {
  const { email, password } = action.payload;
  const res = await fetch(`${REACT_APP_URL}login`, {
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

function* workerLoginUser(action) {
  try {
    const user = yield call(fetchLoginUser, action);
    yield put(authUserAC(user));
    yield put(clearReservationAC());
    yield put(cartCleanAC());
  } catch (err) {
    console.error(err);
  }
}

function* logInWatcher() {
  yield takeEvery(SAGA_FETCH_LOGIN, workerLoginUser);
}

// Регистрация юзера
const fetchRegUser = async (action) => {
  const { email, name, phone, password } = action.payload;
  const res = await fetch(`${REACT_APP_URL}api/clients/new`, {
    method: 'POST',
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

function* workerRegUser(action) {
  try {
    const user = yield call(fetchRegUser, action);
    yield put(authUserAC(user));
    yield put(clearReservationAC());
    yield put(cartCleanAC());
  } catch (err) {
    console.error(err);
  }
}

function* registrationWatcher() {
  yield takeEvery(SAGA_FETCH_REG, workerRegUser);
}

// Логаут юзера
const fetchLogoutUser = async () => {
  const response = await fetch(`${REACT_APP_URL}logout`, {
    credentials: 'include',
  });
  if (response.status !== 200) {
    alert('Ой, что то пошло не так.')
  }
  return;
};

function* workerLogoutUser() {
  try {
    yield call(fetchLogoutUser);
    yield put(logoutUserAC());
    yield put(clearReservationAC());
    yield put(cartCleanAC());
  } catch (err) {
    console.error(err);
  }
}

function* logOutWatcher() {
  yield takeEvery(SAGA_FETCH_LOGOUT, workerLogoutUser);
}

export default function* watcherUserSaga() {
  yield all([logInWatcher(), logOutWatcher(), registrationWatcher()]);
}
