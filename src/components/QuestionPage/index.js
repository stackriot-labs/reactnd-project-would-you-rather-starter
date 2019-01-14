import { getQuestions } from '../../actions/questions';
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
    this.setState({
      voted: props.voted
    });
  }
  componentDidMount() {
    // Load data depending on route
    this.props.dispatch(getQuestions());
  }
  handleFormSelection(event){
    let questionOptionInput = event.target.form.elements['questionOption'];
    let questionOption = questionOptionInput.value;

    this.setState({
      questionOption
    });
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
                        <Results question={this.props.question} />
                      :
                        <QuestionForm
                          question={this.props.question}
                          handleFormSelection={this.handleFormSelection}
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

  let voteData = { 'voteTotal': 0 };
  questionOptionNames.forEach((optionName) => {
    voteData[optionName] = 0;
  });

  if(question){
    voteData = questionOptionNames.reduce((voteObject, optionName) => {
      voteObject[optionName] += question[optionName].votes.length;
      return voteObject;
    }, voteData);
  }

  voteData.voteTotal = voteData.optionOne + voteData.optionTwo;

  const { voteTotal, optionOne, optionTwo } = voteData;

  return {
    question,
    author,
    voted,
    voteTotal,
    optionOne,
    optionTwo,
    loading : question === undefined || author === undefined
  };
}

export default connect(mapStateToProps)(QuestionPage);
