import {
  RESERVATION_SELECT_TABLE,
  RESERVATION_SELECT_HALL,
  RESERVATION_SELECT_DATETIME,
  RESERVATION_RESET_CURRENT_SELECTION,
  RESERVATION_SET_RESERVATION,
  GET_RESERVATIONS,
  UPDATE_RESERVATION,
  COMPLETE_RESERVATION,
  DELETE_RESERVATION
} from '../actionTypes/actionType';


// RESERVATIONS
export const selectReservDateTimeAC = (payload) => {
  return {
    type: RESERVATION_SELECT_DATETIME,
    payload,
  };
};

export const selectReservHallAC = (payload) => {
  return {
    type: RESERVATION_SELECT_HALL,
    payload,
  };
};

export const selectReservTableAC = (payload) => {
  return {
    type: RESERVATION_SELECT_TABLE,
    payload,
  };
};

export const setReservationAC = (payload) => {
  return {
    type: RESERVATION_SET_RESERVATION,
    payload,
  };
};

export const resetReservSelectionAC = () => {
  return {
    type: RESERVATION_RESET_CURRENT_SELECTION,
  };
};

export const getReservationsAC = (payload) => {
  return {
    type: GET_RESERVATIONS,
    payload,
  };
};

export const updateReservationAC = (payload) => {
  return {
    type: UPDATE_RESERVATION,
    payload,
  };
};

export const completeReservationAC = (payload) => {
  return {
    type: COMPLETE_RESERVATION,
    payload,
  };
};

export const deleteReservationAC = (payload) => {
  return {
    type: DELETE_RESERVATION,
    payload,
  };
};
