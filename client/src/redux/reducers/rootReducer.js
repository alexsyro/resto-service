import { combineReducers } from 'redux';

import getMenuReducer from './getMenuReducer';
import staffReducer from './staffReducer';
import usersReducer from './usersReducer';
import ordersReducer from './ordersReducer';
import menuReducer from './menuReducer';
import reservationReducer from './reservationReducer';

const rootReducer = combineReducers({
  getMenuReducer,
  menuReducer,
  staffReducer,
  usersReducer,
  ordersReducer,
  reservationReducer,
});

export default rootReducer;
