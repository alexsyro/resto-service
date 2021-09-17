import { GET_MENU, UPD_CARD, DEL_CARD } from '../actionTypes/actionType';

const initialState = { menu: [] };

const getMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU:
      if (state.menu.length) {
        return state;
      } else {
        return { ...state, menu: action.payload };
      }

    case UPD_CARD:
      return {
        ...state, menu: state.menu.map((card) => {
          if (card.id === action.payload.id) {
            return { ...card, title: action.payload.inputTitle, body: action.payload.inputBody }
          } else {
            return card
          }
        })
      }

    case DEL_CARD:
      return { ...state, menu: state.menu.filter((card) => card.id !== action.payload) } //нужно затереть карточку и в базе данных

    default:
      return state;
  }
};

export default getMenuReducer;
