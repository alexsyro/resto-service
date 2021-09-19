import { combineReducers } from 'redux';

import staffReducer from './staffReducer';
import usersReducer from './usersReducer';
import ordersReducer from './ordersReducer';
import menuReducer from './menuReducer';
import reservationReducer from './reservationReducer';
import dishesReducer from './dishesReducer';

const rootReducer = combineReducers({
  menuReducer,
  staffReducer,
  usersReducer,
  ordersReducer,
  reservationReducer,
  dishesReducer,
});

export default rootReducer;
