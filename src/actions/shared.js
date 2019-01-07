import { getQuestions } from '../actions/questions';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());

    let thePromise = null;

    switch(window.location.pathname){
      case '/':
        thePromise = getQuestions();
      break;
      default:
        thePromise = new Promise();
    }

    thePromise
      .then(() => dispatch(hideLoading()));
  };
}
