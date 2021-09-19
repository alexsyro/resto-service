import { combineReducers } from 'redux';

import staffReducer from './staffReducer';
import usersReducer from './usersReducer';
import menuReducer from './menuReducer'
import dishesReducer from './dishesReducer'

const rootReducer = combineReducers({
  menuReducer,
  staffReducer,
  usersReducer,
  dishesReducer
 
});

export default rootReducer;
