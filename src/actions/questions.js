import { showLoading, hideLoading } from 'react-redux-loading';
import { getUsersAction } from './users';
import * as API from '../utils/api';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export const getQuestionsAction = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const addQuestion = (question) => ({
  type: ADD_QUESTION,
  question,
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
    dispatch(showLoading());
    const { authedUser } = getState();

    return API.saveAnswer({ authedUser, qid, answer })
      .then(() => {
        API.getQuestions()
          .then((questions) => {
            dispatch(getQuestionsAction(questions));
            dispatch(hideLoading());
          });
      });
  }
);

export const saveQuestion = ({ author, optionOneText, optionTwoText }) => (
  (dispatch, getState) => {
    dispatch(showLoading());

    return API.saveQuestion({ author, optionOneText, optionTwoText })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(hideLoading());
      });
  }
);
