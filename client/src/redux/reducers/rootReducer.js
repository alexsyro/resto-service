import { combineReducers } from 'redux';
import getMenuReducer from './getMenuReducer';

const rootReducer = combineReducers({
  getMenuReducer,
});

export default rootReducer;
