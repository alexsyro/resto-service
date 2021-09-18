import { GET_CATEGORY } from '../actionTypes/actionType';

const initialState = { menu: [] };

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      if (state.menu.length) {
        return state;
      } else {
        return { ...state, menu: action.payload };
      }
    default:
      return state;
  }
};

export default menuReducer;
