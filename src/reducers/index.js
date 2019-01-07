import authedUser from './authedUser';
import { combineReducers } from 'redux';
import questions from './questions';

export default combineReducers({
  authedUser,
  questions,
});
