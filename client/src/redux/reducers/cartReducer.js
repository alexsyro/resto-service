import {
  CART_ADD_POSITION,
  CART_REMOVE_POSITION,
  CART_CLEAN_POSITIONS,
  CART_CHANGE_QUANTITY,
} from '../actionTypes/actionType';

const localCart = JSON.parse(localStorage.getItem('cart'));
console.log('LOCALCART', localCart);
const initialState = localCart ? { cart: localCart } : { cart: [] };

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
            return position;
          }),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
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
    case CART_CLEAN_POSITIONS:
      return { ...state, cart: [] };
    default:
      return state;
  }
}
