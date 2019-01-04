import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js';

/**
@returns {object} "answered" and "unanswered" questions
*/
export const getQuestions = () => (
  _getQuestions()
    .then((questions) => questions)
);
