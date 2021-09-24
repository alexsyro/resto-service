import {
  CART_ADD_POSITION,
  CART_REMOVE_POSITION,
  CART_CLEAN_POSITIONS,
  CART_CHANGE_QUANTITY,
  CART_INCR_QUANTITY,
  CART_DECR_QUANTITY,
  CART_UPDATE_TOTAL,
} from '../actionTypes/actionType';

const localCart = JSON.parse(localStorage.getItem('cart'));
const initialState = localCart
  ? {
      cart: localCart,
      total: localCart.reduce((acc, pos) => acc + pos.quantity * pos.price, 0),
    }
  : { cart: [], total: 0 };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_POSITION:
      if (state.cart.find((position) => position.id === action.payload.id)) {
        return {
          ...state,
          cart: state.cart.map((position) => {
            if (position.id === action.payload.id) {
              position.quantity += 1;
            }
            position.total = Number(position.quantity) * Number(position.price);

            return position;
          }),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1, total: Number(action.payload.price) }],
      };
    case CART_REMOVE_POSITION:
      return { ...state, cart: state.cart.filter((position) => position.id !== action.payload.id) };
    case CART_CHANGE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((position) => {
          if (position.id === action.payload.id) {
            position.quantity = Number(action.payload.quantity);
          }
          return position;
        }),
      };
    case CART_INCR_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((position) => {
          if (position.id === action.payload.id) {
            position.quantity += 1;
          }
          position.total = +position.quantity * +position.price;
          return position;
        }),
      };
    case CART_DECR_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((position) => {
          if (position.id === action.payload.id) {
            position.quantity -= 1;
          }
          position.total = +position.quantity * +position.price;
          return position;
        }),
      };
    case CART_CLEAN_POSITIONS:
      return { ...state, cart: [], total: 0 };

    case CART_UPDATE_TOTAL:
      return {
        ...state,
        total: state.cart.reduce((acc, pos) => {
          return acc + +pos.total;
        }, 0),
      };
    default:
      return state;
  }
}
