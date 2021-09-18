import { combineReducers } from 'redux';

import getMenuReducer from './getMenuReducer';
import staffReducer from './staffReducer';
import usersReducer from './usersReducer';
import menuReducer from './menuReducer'

const rootReducer = combineReducers({
  getMenuReducer,
  menuReducer,
  staffReducer,
  usersReducer,
 
});

export default rootReducer;
