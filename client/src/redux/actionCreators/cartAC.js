import {
  CART_ADD_POSITION,
  CART_REMOVE_POSITION,
  CART_CLEAN_POSITIONS,
  CART_CHANGE_QUANTITY,
  CART_INCR_QUANTITY,
  CART_DECR_QUANTITY,
  CART_UPDATE_TOTAL,
} from '../actionTypes/actionType';

export const cartAddPositionAC = (payload) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.find((position) => position.id === payload.id)) {
    cart = cart.map((position) => {
      if (position.id === payload.id) {
        position.quantity += 1;
      }
      position.total = +position.quantity * +position.price;
      return position;
    });
  } else {
    cart.push({ ...payload, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  return {
    type: CART_ADD_POSITION,
    payload,
  };
};

export const cartRemovePositionAC = (payload) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart = cart.filter((position) => position.id !== payload.id);
  localStorage.setItem('cart', JSON.stringify(cart));
  return {
    type: CART_REMOVE_POSITION,
    payload,
  };
};

export const cartCleanAC = () => {
  localStorage.removeItem('cart');
  return {
    type: CART_CLEAN_POSITIONS,
  };
};

export const cartChangeQuantityAC = (payload) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart = cart.map((position) => {
    if (position.id === payload.id) {
      position.quantity = Number(payload.quantity);
    }
    return position;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  return {
    type: CART_CHANGE_QUANTITY,
    payload,
  };
};

export const cartIncrQuantityAC = (payload) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart = cart.map((position) => {
    if (position.id === payload.id) {
      position.quantity += 1;
    }
    position.total = +position.quantity * +position.price;
    return position;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  return {
    type: CART_INCR_QUANTITY,
    payload,
  };
};

export const cartDecrQuantityAC = (payload) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart = cart.map((position) => {
    if (position.id === payload.id) {
      position.quantity -= 1;
    }
    position.total = +position.quantity * +position.price;
    return position;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  return {
    type: CART_DECR_QUANTITY,
    payload,
  };
};

export const cartUpdateTotalAC = () => {
  return {
    type: CART_UPDATE_TOTAL,
  };
};
