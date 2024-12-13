import { createStore, combineReducers } from 'redux';
import { itemReducer } from './reducers/reducers';

const rootReducer = combineReducers({
  items: itemReducer,
});

const store = createStore(rootReducer);

export default store;
