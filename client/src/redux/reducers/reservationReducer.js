import {
  RESERVATION_SELECT_DATETIME,
  RESERVATION_SELECT_HALL,
  RESERVATION_SELECT_TABLE,
  RESERVATION_RESET_CURRENT_SELECTION,
  RESERVATION_SET_RESERVATION,
} from '../actionTypes/actionType';

const initialState = { selectedTable: null, selectedHall: null, selectedDateTime: null, reservation: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESERVATION_SELECT_DATETIME:
      return { ...state, selectedDateTime: action.payload.datetime };
    case RESERVATION_SELECT_HALL:
      return { ...state, selectedHall: action.payload.hall };
    case RESERVATION_SELECT_TABLE:
      return { ...state, selectedTable: action.payload.table };
    case RESERVATION_SET_RESERVATION:
      return { ...state, reservation: action.payload.reservation };
    case RESERVATION_RESET_CURRENT_SELECTION:
      return { ...state, selectedTable: null, selectedHall: null, selectedDateTime: null };
    default:
      return state;
  }
}
