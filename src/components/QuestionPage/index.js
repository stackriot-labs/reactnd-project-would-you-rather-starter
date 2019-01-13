import { getQuestions } from '../../actions/questions';
import QuestionForm from './QuestionForm/index';
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
                      <QuestionForm
                        question={this.props.question}
                        questionOption={this.props.originalQuestionOption || this.state.questionOption}
                        handleFormSelection={this.handleFormSelection}
                      />
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
  let originalQuestionOption = '';

  if(question){
    questionOptionNames.some((optionName) => {
      let voted = question[optionName].votes.some((vote) => vote === authedUser);
    if(voted){
        originalQuestionOption = optionName;
      }

      return voted;
    });

  }

  return {
    question,
    author,
    originalQuestionOption,
    loading : question === undefined || author === undefined
  };
}

export default connect(mapStateToProps)(QuestionPage);
