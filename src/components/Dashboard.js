import { getQuestions } from '../actions/questions';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import QuestionPreview from './QuestionPreview';

class Dashboard extends Component{
    componentDidMount() {
      // Load data depending on route
      this.props.dispatch(getQuestions());
    }
    render() {
      return (
      <Fragment>
        <LoadingBar />
        {
          // Don't show anything until the loading has been disabled
          this.props.loading === true
          ? null
          : <div className="Dashboard">
              <ul className="nav nav-tabs" id="questionTabs" role="tablist">
                {
                  Object.keys(this.props).slice(0,2).map((questionType) => (
                    <li className="nav-item" key={questionType}>
                      <a
                        className={`nav-link${Object.keys(this.props)[0] === questionType ? ' active' : ''}`}
                        id={`${questionType}-tab`}
                        data-toggle="tab"
                        href={`#${questionType}`}
                        role="tab"
                        aria-controls={questionType}
                        aria-selected="true">
                        {`${questionType.charAt(0).toUpperCase()}${questionType.substr(1)}`}
                      </a>
                    </li>
                  ))
                }
              </ul>
              <div className="tab-content" id="questionTabsContent">
                {
                  Object.keys(this.props).slice(0,2).map((questionType) => (
                    <div
                      key={questionType}
                      className={`tab-pane fade${Object.keys(this.props)[0] === questionType ? ' show active' : ''}`}
                      id={`${questionType}`}
                      role="tabpanel"
                      aria-labelledby={`${questionType}-tab`}>
                      <ul className="Dashboard-questions">
                        {
                          this.props[questionType].map((id) => (
                            <li key={id}>
                              <QuestionPreview id={id}/>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  ))
                }
             </div>
          </div>
        }
      </Fragment>
    );
  }
};

function mapStateToProps ({ authedUser, questions }) {
  let answered = [];
  let unanswered = [];

  let userAnswered;
  Object.values(questions).forEach((question) => {
    userAnswered = false;
    userAnswered =
      question
        .optionOne
        .votes
        .some((voter) => voter === authedUser)
      ||
      question
      .optionTwo
      .votes
      .some((voter) => voter === authedUser);

    if(userAnswered){
      answered.push(question.id);
    } else {
      unanswered.push(question.id);
    }
  });
  return {
    answered: answered.sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    unanswered: unanswered.sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    loading: questions === null
  };
}

export default connect(mapStateToProps)(Dashboard);
