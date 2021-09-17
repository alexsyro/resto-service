import { GET_USER, SAGA_FETCH_LOGIN } from '../actionTypes/actionType'

export const getUserAC = (payload) => {
  return {
    type: GET_USER,
    payload
  }
}

export const sagaLoginAC = () => {
  return {
    type: SAGA_FETCH_LOGIN
  }
}