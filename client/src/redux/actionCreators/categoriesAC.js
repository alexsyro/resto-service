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
  SAGA_FETCH_GET_CATEGORIES,
  SAGA_SET_CURRENT_CATEGORY,
  SAGA_FETCH_ADD_CATEGORY,
  SAGA_FETCH_CHANGE_CATEGORY,
  SAGA_FETCH_DELETE_CATEGORY,
  SAGA_SET_CURRENT_SUBCATEGORY,
  SAGA_FETCH_ADD_SUBCATEGORY,
  SAGA_FETCH_CHANGE_SUBCATEGORY,
  SAGA_FETCH_DELETE_SUBCATEGORY,
} from '../actionTypes/categoryTypes';

// AC for reducer
export const getCategoriesAC = (payload) => {
  return {
    type: GET_CATEGORIES,
    payload,
  };
};
export const addCategoryAC = (payload) => {
  return {
    type: ADD_CATEGORY,
    payload,
  };
};
export const changeCategoryAC = (payload) => {
  return {
    type: CHANGE_CATEGORY,
    payload,
  };
};
export const deleteCategoryAC = (payload) => {
  return {
    type: DELETE_CATEGORY,
    payload,
  };
};
export const setCurrentCategoryAC = (payload) => {
  return {
    type: SET_CURRENT_CATEGORY,
    payload,
  };
};
export const addSubCategoryAC = (payload) => {
  return {
    type: ADD_SUBCATEGORY,
    payload,
  };
};
export const changeSubCategoryAC = (payload) => {
  return {
    type: CHANGE_SUBCATEGORY,
    payload,
  };
};
export const deleteSubCategoryAC = (payload) => {
  return {
    type: DELETE_SUBCATEGORY,
    payload,
  };
};
export const setCurrentSubCategoryAC = (payload) => {
  return {
    type: SET_CURRENT_SUBCATEGORY,
    payload,
  };
};

// AC for saga
// CATEGORY
export const sagaGetCategoriesAC = () => {
  return {
    type: SAGA_FETCH_GET_CATEGORIES,
  };
};

export const sagaAddCategoryAC = (payload) => {
  return {
    type: SAGA_FETCH_ADD_CATEGORY,
    payload,
  };
};

export const sagaChangeCategoryAC = (payload) => {
  return {
    type: SAGA_FETCH_CHANGE_CATEGORY,
    payload,
  };
};

export const sagaDeleteCategoryAC = (payload) => {
  return {
    type: SAGA_FETCH_DELETE_CATEGORY,
    payload,
  };
};
export const sagaSetCurrentCategoryAC = (payload) => {
  return {
    type: SAGA_SET_CURRENT_CATEGORY,
    payload,
  };
};

// SUBCATEGORY
export const sagaAddSubcategoryAC = (payload) => {
  return {
    type: SAGA_FETCH_ADD_SUBCATEGORY,
    payload,
  };
};

export const sagaChangeSubcategoryAC = (payload) => {
  return {
    type: SAGA_FETCH_CHANGE_SUBCATEGORY,
    payload,
  };
};

export const sagaDeleteSubcategoryAC = (payload) => {
  return {
    type: SAGA_FETCH_DELETE_SUBCATEGORY,
    payload,
  };
};

export const sagaSetCurrentSubcategoryAC = (payload) => {
  return {
    type: SAGA_SET_CURRENT_SUBCATEGORY,
    payload,
  };
};
