import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { logoutReducer } from './logout.reducer';
import { todoReducer } from './todo.reducer';
import { itemReducer } from './item.reducer';

export const rootReducer = combineReducers({
  authReducer,
  logoutReducer,
  todoReducer,
  itemReducer
});