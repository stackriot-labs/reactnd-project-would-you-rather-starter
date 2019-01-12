import { getQuestions } from '../../actions/questions';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import './style.css';

class QuestionPage extends Component {
  componentDidMount() {
    // Load data depending on route
    this.props.dispatch(getQuestions());
  }
  render(){
    return (
      <Fragment>
        <LoadingBar />
        {
          !this.props.loading &&
          <div className="QuestionPage card">
            <div className="card-header">
              <strong>
                {this.props.author.name} asks:
              </strong>
            </div>
            <div className="card-body">
              <form className="container">
                <div className="row align-items-center">
                  <div className="col-3 avatar">
                    <img src={`${this.props.author.avatarURL}`} alt={`${this.props.author.name}'s avatar`} className="mw-100" />
                  </div>
                  <div className="col-9">
                    <h2 className="card-title">
                        Would You Rather...
                    </h2>
                    <div className="form-group">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="question-option" id="optionOne" value="optionOne" />
                        <label className="form-check-label" htmlFor="optionOne">{`${this.props.question.optionOne.text}...`}</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="question-option" id="optionTwo" value="optionTwo" />
                        <label className="form-check-label" htmlFor="optionTwo">{`${this.props.question.optionTwo.text}...`}</label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
      </Fragment>
    );
}
};

function mapStateToProps ({ questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const author = question ? users[question.author] : undefined;

  return {
    question,
    author,
    loading : question === undefined || author === undefined
  };
}

export default connect(mapStateToProps)(QuestionPage);
