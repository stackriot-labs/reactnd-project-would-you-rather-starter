import * as API from '../utils/api';

export const GET_QUESTIONS = 'GET_QUESTIONS';

const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const getQuestions = () => (
  (dispatch) => {
    return API.getQuestions()
      .then((questions) => {
        dispatch(getQuestions(questions));
      });
    }
);
