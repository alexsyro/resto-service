import { combineReducers } from 'redux';

import getMenuReducer from './getMenuReducer';
import staffReducer from './staffReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  getMenuReducer,
  staffReducer,
  usersReducer,
});

export default rootReducer;
