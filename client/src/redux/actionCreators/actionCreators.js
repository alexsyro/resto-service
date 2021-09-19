import {
  RESERVATION_SELECT_TABLE,
  RESERVATION_SELECT_HALL,
  RESERVATION_SELECT_DATETIME,
  RESERVATION_RESET_CURRENT_SELECTION,
  RESERVATION_SET_RESERVATION,
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
