import { showLoading, hideLoading } from 'react-redux-loading';
import { getUsersAction } from './users';
import * as API from '../utils/api';

export const GET_QUESTIONS = 'GET_QUESTIONS';

export const getQuestionsAction = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const getQuestions = () => (
  (dispatch) => {
    dispatch(showLoading());
    return API.getQuestions()
      .then((questions) => {
        dispatch(getQuestionsAction(questions));
        API.getUsers()
          .then((users) => {
            dispatch(getUsersAction(users));
            dispatch(hideLoading());
          });
      });
    }
);

export const saveAnswer = ({ qid, answer }) => (
  (dispatch, getState) => {
    const { authedUser } = getState();

    return API.saveAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(getQuestions());
      });
  }
);
