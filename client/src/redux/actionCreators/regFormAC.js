import { GET_USER, SAGA_FETCH_REG } from '../actionTypes/actionType'

export const getUserAC = (payload) => {
  return {
    type: GET_USER,
    payload
  }
}

export const sagaRegAC = () => {
  return {
    type: SAGA_FETCH_REG
  }
}
