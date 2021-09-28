import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  CHANGE_CATEGORY,
  DELETE_CATEGORY,
  SET_CURRENT_CATEGORY,
  ADD_SUBCATEGORY,
  CHANGE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  SET_CURRENT_SUBCATEGORY,
} from '../actionTypes/categoryTypes';

const initialState = { categories: [], currentCategory: null, currentSubcategory: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload.categories };
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload.category] };
    case CHANGE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === state.currentCategory.id) {
            category.name = action.payload.category.name;
          }
          return category;
        }),
      };
    case DELETE_CATEGORY:
      return { ...state, categories: state.categories.filter((category) => category.id !== action.payload.id) };
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: state.categories.find((category) => category.id === Number(action.payload.id)),
      };
    case ADD_SUBCATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === state.currentCategory.id) {
            category.Subcategories = [...category.Subcategories, action.payload.subcategory];
          }
          return category;
        }),
      };
    case CHANGE_SUBCATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === state.currentCategory.id) {
            category.Subcategories = category.Subcategories.map((subcategory) => {
              if (subcategory.id === state.currentSubcategory.id) {
                subcategory = action.payload.subcategory;
              }
              return subcategory;
            });
          }
          return category;
        }),
      };
    case DELETE_SUBCATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.id === state.currentCategory.id) {
            category.Subcategories = category.Subcategories.filter(
              (subcategory) => subcategory.id !== state.currentSubcategory.id,
            );
          }
          return category;
        }),
      };
    case SET_CURRENT_SUBCATEGORY:
      return {
        ...state,
        currentSubcategory: state.currentCategory.Subcategories.find(
          (subcategory) => subcategory.id === Number(action.payload.id),
        ),
      };
    default:
      return state;
  }
}
