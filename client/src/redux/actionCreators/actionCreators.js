import {
  RESERVATION_SELECT_TABLE,
  RESERVATION_SELECT_HALL,
  RESERVATION_SELECT_DATETIME,
  RESERVATION_RESET_CURRENT_SELECTION,
  RESERVATION_SET_RESERVATION,
  RESERVATION_CLEAR_CURRENT,
  GET_RESERVATIONS,
  UPDATE_RESERVATION,
  COMPLETE_RESERVATION,
  DELETE_RESERVATION,
  AUTH_USER,
  LOGOUT_USER,
  CANCEL_RESERVATION,
} from '../actionTypes/actionType';

// Регистрация и логин пользователя
export const authUserAC = (payload) => {
  localStorage.setItem('user', JSON.stringify({ user: { ...payload.user, isAuth: true } }));
  console.log('USER: ', payload);
  return {
    type: AUTH_USER,
    payload,
  };
};

export const logoutUserAC = () => {
  localStorage.removeItem('user');
  return {
    type: LOGOUT_USER,
  };
};

// RESERVATIONS
export const selectReservDateTimeAC = (payload) => {
  //payload.datetime: {date: 'yyyy-MM-dd', time: 'HH:mm'}
  let reservation = JSON.parse(localStorage.getItem('reservation')) || {};
  reservation = { ...reservation, selectedDateTime: { ...payload.datetime } };
  localStorage.setItem('reservation', JSON.stringify(reservation));
  return {
    type: RESERVATION_SELECT_DATETIME,
    payload,
  };
};

export const selectReservHallAC = (payload) => {
  // payload.hall: {id: 1, name: 'Ресторан', createdAt: '2021-09-21T12:44:16.235Z', updatedAt: null}
  let reservation = JSON.parse(localStorage.getItem('reservation')) || {};
  reservation = { ...reservation, selectedHall: { ...payload.hall } };
  localStorage.setItem('reservation', JSON.stringify(reservation));
  return {
    type: RESERVATION_SELECT_HALL,
    payload,
  };
};

export const selectReservTableAC = (payload) => {
  //payload.table: {id: 33, HallId: 2, number: 105, seatsLimit: 6, svgCoords: 'coords'}
  let reservation = JSON.parse(localStorage.getItem('reservation')) || {};
  reservation = { ...reservation, selectedTable: { ...payload.table } };
  localStorage.setItem('reservation', JSON.stringify(reservation));
  return {
    type: RESERVATION_SELECT_TABLE,
    payload,
  };
};

export const setReservationAC = (payload) => {
  // payload.reservation: {StateId: 1, id: 13, TableId: 31, dateTime: '2021-09-20T21:28:00.000Z', guestCount: 2, …}
  let reservation = JSON.parse(localStorage.getItem('reservation')) || {};
  reservation = {
    ...reservation,
    selectedHall: null,
    selectedTable: null,
    selectedDateTime: null,
    reservation: { ...payload.reservation },
  };
  localStorage.setItem('reservation', JSON.stringify(reservation));
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
export const clearReservationAC = () => {
  localStorage.removeItem('reservation');
  return {
    type: RESERVATION_CLEAR_CURRENT,
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

export const cancelReservationAC = (payload) => {
  return {
    type: CANCEL_RESERVATION,
    payload,
  };
};
