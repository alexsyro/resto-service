import { combineReducers } from 'redux';

import staffReducer from './staffReducer';
import usersReducer from './usersReducer';
import ordersReducer from './ordersReducer';
import menuReducer from './menuReducer';
import reservationReducer from './reservationReducer';
import dishesReducer from './dishesReducer';
import clientsReducer from './сlientsReducer';
import cartReducer from './cartReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  menuReducer,
  staffReducer,
  usersReducer,
  ordersReducer,
  reservationReducer,
  dishesReducer,
  clientsReducer,
  cartReducer,
  categoryReducer,
});

export default rootReducer;
