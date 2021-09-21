import { AUTH_USER, LOGOUT_USER } from '../actionTypes/actionType';

const localUser = JSON.parse(localStorage.getItem('user'))
const initialState = localUser || { user: { isAuth: false } };

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, user: { ...action.payload.user, isAuth: true } };
    case LOGOUT_USER:
      return { ...state, user: { isAuth: false } };
    default:
      return state;
  }
};

export default usersReducer;
