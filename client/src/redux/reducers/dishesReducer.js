import { GET_DISHES, UPD_DISH, DEL_DISH } from '../actionTypes/actionType';

const initialState = { dishes: [] };

const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISHES:
      if (state.dishes.length) {
        return state;
      } else {
        return { ...state, dishes: action.payload.positions };
      }
    case UPD_DISH:
      return {
        ...state, dishes: state.dishes.map((card) => {
          if (card.id === action.payload.id) {
            return { ...card, name: action.payload.inputName, description: action.payload.inputDescription, kcal: action.payload.inputKcal, portionSize: action.payload.inputPortionSize, price: action.payload.inputPrice }
          } else {
            return card
          }
        })
      }
    case DEL_DISH:
      return { ...state, dishes: state.dishes.filter((card) => card.id !== action.payload) }

    default:
      return state;
  }
};

export default dishesReducer;
