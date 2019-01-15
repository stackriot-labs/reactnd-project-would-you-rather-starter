import { getQuestions, saveAnswer } from '../../actions/questions';
import { tabs } from '../Dashboard/index';
import QuestionForm from './QuestionForm/index';
import Results from './Results/index';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import './style.css';

export const questionOptionNames = ['optionOne', 'optionTwo'];

class QuestionPage extends Component {
  state = {
    voted : false,
    questionOption: null
  }
  constructor(props) {
    super(props);
    this.handleFormSelection = this.handleFormSelection.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }
  componentDidMount() {
    // Load data depending on route
    this.props.dispatch(getQuestions());
    this.setState({
      voted: this.props.voted
    });
  }
  handleFormSelection(event){
    let questionOptionInput = event.target.form.elements['questionOption'];
    let questionOption = questionOptionInput.value;

    this.setState({
      questionOption
    });
  }
  handleFormSubmission(event){
    event.preventDefault();

    if(this.state.questionOption){
      const qid = this.props.question.id;
      const answer = this.state.questionOption;
      this.props.dispatch(saveAnswer({ qid, answer}));
    }
  }
  render(){
    return (
      <Fragment>
        <LoadingBar />
        {
          !this.props.loading &&
          <div className="QuestionPage mx-md-auto mt-1">
            <div className="card">
              <div className="card-header">
                <strong>
                  {this.props.author.name} asks:
                </strong>
              </div>
              <div className="card-body">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-3 avatar">
                      <img src={`${this.props.author.avatarURL}`} alt={`${this.props.author.name}'s avatar`} className="mw-100" />
                    </div>
                    <div className="col-9">
                    {
                      this.props.voted ?
                        <Results
                          question={this.props.question}
                          optionOne={this.props.optionOne}
                          optionTwo={this.props.optionTwo}
                          voteTotal={this.props.voteTotal}
                          myOption={this.props.myOption}
                        />
                      :
                        <QuestionForm
                          question={this.props.question}
                          handleFormSelection={this.handleFormSelection}
                          handleFormSubmission={this.handleFormSubmission}
                        />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </Fragment>
    );
}
};

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const author = question ? users[question.author] : undefined;
  tabs.questionSort({ authedUser, questions});
  const voted = tabs.answered.questionIds.some((questionId) => questionId === id);

  let myOption = null;

  /*
  A container to hold vote results while looping through
  question data.
  */
  let voteData = { 'voteTotal': 0 };
  questionOptionNames.forEach((optionName) => {
    voteData[optionName] = 0;
  });

  // Only do the following if the question data is ready
  if(question){
    voteData = questionOptionNames.reduce((voteObject, optionName) => {
      voteObject[optionName] += question[optionName].votes.length;
      return voteObject;
    }, voteData);

    questionOptionNames.some((optionName) => {
      let localVoted = question[optionName].votes.some((vote) => vote === authedUser);
      if(localVoted){
        myOption = optionName;
      }

      return localVoted;
    });
  }

  voteData.voteTotal = voteData.optionOne + voteData.optionTwo;

  const { voteTotal, optionOne, optionTwo } = voteData;

  return {
    question, // The question data
    author, // The question author data
    voted, // Whether or not the authenticated user voted
    voteTotal, // Total votes for the question
    optionOne, // Total votes for option one
    optionTwo, // Total votes for option two
    myOption, // The option that the authenticated user voted for
    loading : question === undefined ||
      author === undefined // Whether or not the page is loading
  };
}

export default connect(mapStateToProps)(QuestionPage);
