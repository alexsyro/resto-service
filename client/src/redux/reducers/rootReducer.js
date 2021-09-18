import { combineReducers } from 'redux';

import getMenuReducer from './getMenuReducer';
import staffReducer from './staffReducer';
import usersReducer from './usersReducer';
import ordersReducer from './ordersReducer';

const rootReducer = combineReducers({
  getMenuReducer,
  staffReducer,
  usersReducer,
  ordersReducer
});

export default rootReducer;
