import * as actionTypes from '../actionTypes/actionType'

export const getReservationsAC = (payload) => {
  return {
    type: actionTypes.GET_RESERVATIONS,
    payload
  }
}

export const updateReservationAC = (payload) => {
  return {
    type: actionTypes.UPDATE_RESERVATION,
    payload
  }
}

export const completeReservationAC = (payload) => {
  return {
    type: actionTypes.COMPLETE_RESERVATION,
    payload
  }
}

export const deleteReservationAC = (payload) => {
  return {
    type: actionTypes.DELETE_RESERVATIONS,
    payload
  }
}

// when saga'll be ready to use
// export const sagaOrdersAC = () => {
//   return {
//     type: actionTypes.SAGA_FETCH_ORDERS
//   }
// }
