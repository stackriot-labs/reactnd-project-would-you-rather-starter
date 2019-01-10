import { getQuestions } from '../actions/questions';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import QuestionPreview from './QuestionPreview';

/*
This object might belong in its own class file or something like that, but for now it's here.
The purpose is to centralize the location of tab labels, associated data, and criteria for populating tabs.
You can add more tabs by adding objects after the initially provided ones. You can add criteria for sorting questions
into new tabs by editing `questionSort` or you can add more functions to the end of the `tabs` object for custom criteria.
*/
let tabs = {
  'answered' : {
    id: 'answered',
    name: 'Answered',
    contentIds : []
  },
  'unanswered' : {
    id: 'unanswered',
    name: 'Unanswered',
    contentIds : []
  },
  'questionSort' : ({ authedUser, questions }) => {
    let questionMatch;

    Object.values(tabs)[0].contentIds = [];
    Object.values(tabs)[1].contentIds = [];

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
        Object.values(tabs)[0].contentIds.push(question.id);
      } else {
        Object.values(tabs)[1].contentIds.push(question.id);
      }
    });
  }
};

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
              <div className="tab-content" id="questionTabsContent">
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
                          questionType.contentIds.map((id) => (
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

function mapStateToProps ({ authedUser, questions, users }) {
  let newProps = {};
  tabs.questionSort({ authedUser, questions });

  Object.values(tabs).forEach((tab) => {
    /*
    The object tabs are regular tab data whereas the functions are assignment criteria
    */
    if(typeof(tab) === 'object'){
      newProps[tab.id] = tab.contentIds.sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    }
  });

  newProps.loading = questions === null;

  return newProps;
}

export default connect(mapStateToProps)(Dashboard);
