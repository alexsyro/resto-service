import { combineReducers } from 'redux';

import getMenuReducer from './getMenuReducer';
import staffReducer from './staffReducer';
import usersReducer from './usersReducer';
import reservationReducer from './reservationReducer';

const rootReducer = combineReducers({
  getMenuReducer,
  staffReducer,
  usersReducer,
  reservationReducer,
});

export default rootReducer;
