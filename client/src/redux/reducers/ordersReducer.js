import * as actionTypes from '../actionTypes/actionType';

const initialState = { orders: [] };

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS:
      if (state.orders.length) {
        return state;
      } else {
        return { ...state, orders: action.payload };
      }

    case actionTypes.UPDATE_ORDER:
      return {
        ...state, orders: state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return { ...order, userId: action.payload.inputUserId, title: action.payload.inputTitle }
          } else {
            return order
          }
        })
      }
    case actionTypes.COMPLETE_ORDER:
      return {
        ...state, orders: state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return { ...order, status: 'Checked' }
          } else {
            return order
          }
        })
      }

    case actionTypes.DELETE_ORDER:
      return { ...state, orders: state.orders.filter((order) => order.id !== action.payload) }

    default:
      return state;
  }
};

export default ordersReducer;

