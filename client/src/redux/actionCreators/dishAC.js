import { GET_DISHES, SAGA_FETCH_DISH } from '../actionTypes/actionType'

export const getDishAC = (payload) => {
  console.log(payload, "GETDISHAC")
  return {
    type: GET_DISHES,
    payload
  }
}

export const dishAC = (payload) => {
  console.log('DISHAC payload', payload)
  return {
    type: SAGA_FETCH_DISH,
    payload
  }
}

