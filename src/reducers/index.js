import authedUser from './authedUser';
import { loadingBarReducer } from 'react-redux-loading';
import { combineReducers } from 'redux';
import users from './users';
import questions from './questions';

export default combineReducers({
  authedUser,
  questions,
  users,
  loadingBar: loadingBarReducer
});
