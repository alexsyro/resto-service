import * as actionTypes from '../actionTypes/actionType';

const initialState = { orders: [] };

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS:
      return { ...state, orders: action.payload };

    case actionTypes.UPDATE_ORDER:
      return {
        ...state, orders: state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return { ...order, reservation_id: action.payload.ReservationId, Reservation: { ...order.Reservation, id: action.payload.ReservationId } }
          } else {
            return order
          }
        })
      }
    case actionTypes.COMPLETE_ORDER:
      return {
        ...state, orders: state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return { ...order, state_id: 2, 'State': { ...order.State, state: 'ПОДТВЕРЖДЕНО' } }
          } else {
            return order
          }
        })
      }

    case actionTypes.DELETE_ORDER:
      return { ...state, orders: state.orders.filter((order) => order.id !== action.payload) }

    case actionTypes.DELETE_ORDER_POSITION:
      return {
        ...state, orders: [...state.orders].map(order => {
          return {
            ...order, OrderPositions: [...order.OrderPositions].filter(position => {
              if (position.id !== action.payload.id) {
                return true
              } else {
                return false
              }
            })
          }
        })
      }

    case actionTypes.CANCEL_ORDER:
      return {
        ...state, orders: state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return { ...order, state_id: 7, 'State': { ...order.State, state: 'ОТМЕНА' } }
          } else {
            return order
          }
        })
      }

    default:
      return state;
  }
};

export default ordersReducer;

