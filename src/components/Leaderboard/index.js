import { getQuestions } from '../../actions/questions';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import './style.css';
import { questionOptionNames } from '../QuestionPage/index';

class Leaderboard extends Component {
  componentDidMount() {
    this.props.dispatch(getQuestions());
  }
  render(){
    return (
      <Fragment>
        <LoadingBar />
        <div className="Leaderboard mt-1 mx-md-auto">
          <ul className="list-unstyled">
            {
              !this.props.loading &&
              this.props.users.map((user) => (
                <li className="mb-2" key={user.id}>
                  <div className="container card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-3">
                          <img
                            className="mw-100"
                            src={`${user.avatarURL}`}
                            alt={`${user.name}'s avatar`}
                           />
                        </div>
                        <div className="col-6">
                          <h2 className="card-title">
                            {user.name}
                          </h2>
                          <div className="card-text">
                            <dl class="row stats-list">
                              <dt className="col-9">
                                Answered questions
                              </dt>
                              <dd className="col-3">
                                {user.totalAnswered}
                              </dd>
                              <dt className="col-9">
                                Created questions
                              </dt>
                              <dd className="col-3">
                                {user.totalCreated}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="card text-center score-card">
                            <div className="card-header d-none d-sm-block">
                              Score
                            </div>
                            <div className="card-text py-2">
                              <span class="badge badge-pill badge-primary score-badge">{user.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </Fragment>
    );
  }
};

function mapStateToProps ({ questions, users }) {
  let voted = false;
  let created = false;
  let newUsers = {};

  let voteData = {};
  // Only do the following if the question data is ready
  if(questions && users){
    newUsers = Object.values(users).map((user) => {
      voteData = {'totalAnswered': 0, 'totalCreated': 0, 'total': 0};
      voteData = Object.values(questions).reduce((voteObject, question) => {
        voted = questionOptionNames.some((optionName) => (
           question[optionName].votes.some((vote) => vote === user.id)
        ));

        created = question.author === user.id;

        if(voted){
          voteObject.totalAnswered += 1;
        }

        if(created){
          voteObject.totalCreated += 1;
        }

        return voteObject;
      }, voteData);

      voteData.total = voteData.totalAnswered + voteData.totalCreated;

      return {
        ...user,
        ...voteData
      };
    });
  }

  return {
    users: newUsers,
    loading: questions === undefined ||
      users === undefined
  };
}

export default connect(mapStateToProps)(Leaderboard);
