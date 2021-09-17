import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(rootReducer, composeWithDevTools());
