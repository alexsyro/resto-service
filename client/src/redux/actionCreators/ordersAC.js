import * as actionTypes from '../actionTypes/actionType'

export const getOrdersAC = (payload) => {
  return {
    type: actionTypes.GET_ORDERS,
    payload
  }
}

export const updateOrderAC = (payload) => {
  return {
    type: actionTypes.UPDATE_ORDER,
    payload
  }
}

export const completeOrderAC = (payload) => {
  return {
    type: actionTypes.COMPLETE_ORDER,
    payload
  }
}

export const deleteOrderAC = (payload) => {
  return {
    type: actionTypes.DELETE_ORDER,
    payload
  }
}

// when saga'll be ready to use
// export const sagaOrdersAC = () => {
//   return {
//     type: actionTypes.SAGA_FETCH_ORDERS
//   }
// }
