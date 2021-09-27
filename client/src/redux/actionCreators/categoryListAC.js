import { GET_CATEGORY } from '../actionTypes/actionType';
import { SAGA_FETCH_CATEGORYLIST } from '../actionTypes/sagaTypes';

export const getCategoryListAC = () => {
  return {
    type: GET_CATEGORY,
  };
};

export const getCategoriesAC = () => {
  return {
    type: GET_CATEGORY,
  };
};

export const categoryListAC = () => {
  return {
    type: SAGA_FETCH_CATEGORYLIST,
  };
};
