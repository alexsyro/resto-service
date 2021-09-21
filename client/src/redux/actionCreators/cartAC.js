import {
  CART_ADD_POSITION,
  CART_REMOVE_POSITION,
  CART_CLEAN_POSITIONS,
  CART_CHANGE_QUANTITY,
} from '../actionTypes/actionType';

export const cartAddPositionAC = (payload) => {
  return {
    type: CART_ADD_POSITION,
    payload,
  };
};

export const cartRemovePositionAC = (payload) => {
  return {
    type: CART_REMOVE_POSITION,
    payload,
  };
};

export const cartCleanAC = () => {
  return {
    type: CART_CLEAN_POSITIONS,
  };
};

export const cartChangeQuantityAC = (payload) => {
  return {
    type: CART_CHANGE_QUANTITY,
    payload,
  };
};

