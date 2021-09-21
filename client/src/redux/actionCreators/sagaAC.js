import { SAGA_FETCH_REG, SAGA_FETCH_LOGIN, SAGA_FETCH_LOGOUT } from '../actionTypes/sagaTypes';

//Работа с пользователем при аутентификации
export const sagaRegAC = (payload) => {
  return {
    type: SAGA_FETCH_REG,
    payload,
  };
};

export const sagaLoginAC = (payload) => {
  return {
    type: SAGA_FETCH_LOGIN,
    payload,
  };
};

export const sagaLogoutAC = () => {
  return {
    type: SAGA_FETCH_LOGOUT,
  };
};
