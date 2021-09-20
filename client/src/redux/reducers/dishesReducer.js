import { GET_DISHES, UPD_DISH, DEL_DISH, GET_MEASURES } from '../actionTypes/actionType';

const initialState = { dishes: [], measures: [] };

const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISHES:
      return { ...state, dishes: action.payload.positions };

    case GET_MEASURES:
      console.log(action.payload);
      if (state.measures.length) {
        return state;
      } else {
        return { ...state, measures: action.payload };
      }
    case UPD_DISH:
      return {
        ...state,
        dishes: state.dishes.map((card) => {
          if (card.id === action.payload.id) {
            return {
              ...card,
              name: action.payload.inputName,
              description: action.payload.inputDescription,
              kcal: action.payload.inputKcal,
              portionSize: action.payload.inputPortionSize,
              price: action.payload.inputPrice,
            };
          } else {
            return card;
          }
        }),
      };
    case DEL_DISH:
      return { ...state, dishes: state.dishes.filter((card) => card.id !== action.payload) };

    default:
      return state;
  }
};

export default dishesReducer;
