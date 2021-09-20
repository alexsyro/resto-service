import {SAGA_FETCH_CATEGORYLIST, GET_CATEGORY} from '../actionTypes/actionType';

export const getCategoryListAC = (payload) => {
  return {
    type: GET_CATEGORY,
    payload
  }
}

export const categoryListAC = () => {
  return {
    type: SAGA_FETCH_CATEGORYLIST,
  }
}
