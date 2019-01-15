import React, { Component } from 'react';

import { questionOptionNames } from '../index';

class QuestionForm extends Component {
  render() {
    return (
      <form className="QuestionForm" onSubmit={this.props.handleFormSubmission}>
        <h2 className="card-title">
            Would You Rather...
        </h2>
        <div className="form-group">
          {
            questionOptionNames.map((optionName) => (
              <div className="form-check" key={optionName}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="questionOption"
                  id={optionName}
                  value={optionName}
                  onChange={this.props.handleFormSelection}
                />
                <label
                  className="form-check-label"
                  htmlFor={optionName}>{`${this.props.question[optionName].text}?`}
                </label>
              </div>
            ))
          }
        </div>
        <button type="submit" className="btn btn-primary btn-block">Submit</button>
      </form>
    );
  }
};

export default QuestionForm;
