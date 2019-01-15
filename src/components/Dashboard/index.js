import { getQuestions } from '../../actions/questions';
import './style.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import QuestionPreview from '../QuestionPreview/index';

/*
This object might belong in its own class file or something like that, but for now it's here.
The purpose is to centralize the location of tab labels, associated data, and criteria for populating tabs.
You can add more tabs by adding objects after the initially provided ones. You can add criteria for sorting questions
into new tabs by editing `questionSort` or you can add more functions to the end of the `tabs` object for custom criteria.
*/
export const tabs = {
  'answered' : {
    id: 'answered',
    name: 'Answered',
    questionIds : []
  },
  'unanswered' : {
    id: 'unanswered',
    name: 'Unanswered',
    questionIds : []
  },
  'questionSort' : ({ authedUser, questions }) => {
    let questionMatch;

    Object.values(tabs)[0].questionIds = [];
    Object.values(tabs)[1].questionIds = [];

    Object.values(questions).forEach((question) => {
      questionMatch = false;
      questionMatch =
        question
          .optionOne
          .votes
          .some((voter) => voter === authedUser)
        ||
        question
        .optionTwo
        .votes
        .some((voter) => voter === authedUser);

      if(questionMatch){
        Object.values(tabs)[0].questionIds.push(question.id);
      } else {
        Object.values(tabs)[1].questionIds.push(question.id);
      }
    });
  }
};

class Dashboard extends Component{
    componentDidMount() {
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
          : <div className="Dashboard mx-md-auto">
              <ul
                className="Dashboard-questionTabs nav nav-tabs justify-content-center"
                role="tablist"
              >
                {
                  Object.values(tabs).filter((tab) => typeof(tab) === 'object').map((questionType) => (
                    <li className="nav-item" key={questionType.id}>
                      <a
                        className={`nav-link${Object.values(tabs)[0] === questionType ? ' active' : ''}`}
                        id={`${questionType.id}-tab`}
                        data-toggle="tab"
                        href={`#${questionType.id}`}
                        role="tab"
                        aria-controls={questionType.id}
                        aria-selected="true">
                        {questionType.name}
                      </a>
                    </li>
                  ))
                }
              </ul>
              <div className="tab-content mw-100">
                {
                  Object.values(tabs).filter((tab) => typeof(tab) === 'object').map((questionType) => (
                    <div
                      key={questionType.id}
                      className={`tab-pane fade${Object.values(tabs)[0] === questionType ? ' show active' : ''}`}
                      id={questionType.id}
                      role="tabpanel"
                      aria-labelledby={`${questionType.id}-tab`}>
                      <ul className="Dashboard-questions list-unstyled">
                        {
                          questionType.questionIds.map((id) => (
                            <li key={id}>
                              <QuestionPreview id={id} questionType={questionType} />
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

function mapStateToProps ({ authedUser, questions, users }) {
  let newProps = {};
  tabs.questionSort({ authedUser, questions });

  Object.values(tabs).forEach((tab) => {
    /*
    The object tabs are regular tab data whereas the functions are assignment criteria
    */
    if(typeof(tab) === 'object'){
      newProps[tab.id] = tab.questionIds.sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    }
  });

  newProps.loading = questions === null;
  newProps.questions = questions;

  return newProps;
}

export default connect(mapStateToProps)(Dashboard);
