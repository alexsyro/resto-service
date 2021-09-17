import { combineReducers } from 'redux';
import getMenuReducer from './getMenuReducer';
import staffReducer from './staffReducer';

const rootReducer = combineReducers({
  getMenuReducer,
  staffReducer
});

export default rootReducer;
