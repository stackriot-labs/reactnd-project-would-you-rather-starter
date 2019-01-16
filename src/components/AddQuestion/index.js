import { saveQuestion } from '../../actions/questions';
import { questionOptionNames } from '../QuestionPage/index';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { Redirect } from 'react-router-dom';
import './style.css';

const placeholderText = ['do this?', 'do that?'];

class AddQuestion extends Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);

    /*
      If the properties mapped to input values are not explicitly defined, then
      React will not be convinced that the form inputs are controlled, which
      will make it issue a warning about how the inputs are not properly controlled.
    */
    this.state = { 'formSubmitted': false, 'optionOne': '', 'optionTwo': '' };
  }
  componentDidMount() {
    questionOptionNames.forEach((optionName) => {
      this.setState((currentState) => ({...currentState, [optionName]: ''}));
    });
  }
  handleInputChange = (event) => {
    event.persist();
    this.setState((currentState) => {
      let inputValue = {};
      let isTargetInput = '';

      questionOptionNames.some((optionName) => {
        isTargetInput = optionName === event.target.name;
        if(isTargetInput){
          inputValue[optionName] = event.target.value;
        }

        return isTargetInput;
      });
      return {
        ...currentState,
        ...inputValue
      };
    });
  }
  handleFormSubmission = (event) => {
    event.preventDefault();
    event.persist();

    //let invalidInputName = '';
    let invalidInputFound = false;
    let questionObject = {author: this.props.authedUser};

    invalidInputFound = questionOptionNames.some((optionName) => {
      return event.target.elements[optionName].value === '';
    });

    if(!invalidInputFound){
      questionOptionNames.forEach((optionName) => {
        questionObject[`${optionName}Text`] = this.state[optionName];
      });

      this.props.dispatch(saveQuestion({...questionObject})).then(() => {
        this.setState(() => ({
          formSubmitted: true
        }));
      });
    }
  }
  render() {
    if (this.state.formSubmitted) {
      return <Redirect to='/' />;
    }
    return (
      <Fragment>
        <LoadingBar />
        <div className="AddQuestion card mt-1 mx-md-auto">
          <div className="card-header">
            <h2>Create a New Question</h2>
          </div>
          <div className="card-body">
          <h3 className="card-title">
            Complete the question:
          </h3>
          <div className="card-text">
            Would you rather...
          </div>
          <form className="my-2" onSubmit={this.handleFormSubmission}>
              {
                questionOptionNames.map((optionName, index) => (
                  <div className="form-group w-75 mx-auto" key={optionName}>
                    <input
                      type="text"
                      className="form-control"
                      name={optionName}
                      placeholder={placeholderText[index]}
                      onChange={this.handleInputChange}
                      value={this.state[optionName]}
                    />
                  </div>
                ))
              }
              <div className="text-center">
                <small>Please omit the question mark!</small>
              </div>
              <button className="btn btn-primary btn-block w-75 mx-auto" type="submit">Submit</button>
          </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({authedUser}) => (
  {
    authedUser
  }
);

export default connect(mapStateToProps)(AddQuestion);
