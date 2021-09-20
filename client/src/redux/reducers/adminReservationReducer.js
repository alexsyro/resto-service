import * as actionTypes from '../actionTypes/actionType';

const initialState = { adminReservations: [] };

const adminReservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RESERVATIONS:
      if (state.adminReservations.length) {
        return state;
      } else {
        return { ...state, adminReservations: action.payload };
      }

    case actionTypes.UPDATE_RESERVATION:
      return {
        ...state, adminReservations: state.adminReservations.map((reserv) => {
          if (reserv.id === action.payload.id) {
            return { ...reserv, userId: action.payload.inputUserId, title: action.payload.inputTitle }
          } else {
            return reserv
          }
        })
      }
    case actionTypes.COMPLETE_RESERVATION:
      return {
        ...state, adminReservations: state.adminReservations.map((reserv) => {
          if (reserv.id === action.payload.id) {
            return { ...reserv, state_id: 2, 'State.id': 2 }
          } else {
            return reserv
          }
        })
      }

    case actionTypes.DELETE_RESERVATIONS:
      return { ...state, adminReservations: state.adminReservations.filter((reserv) => reserv.id !== action.payload) }

    default:
      return state;
  }
};

export default adminReservationReducer;

