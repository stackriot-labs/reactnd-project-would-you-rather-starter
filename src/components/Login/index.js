import { setAuthedUser } from '../../actions/authedUser';
import { getUsers } from '../../actions/users';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { withRouter } from 'react-router-dom';
import './style.css';

class Login extends Component {
  state = { selectedUser: '', formSubmitted: false }
  constructor(props) {
    super(props);

    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    props.history.replace('/');
  }
  componentDidMount() {
    if(Object.values(this.props.users).length === 0){
      this.props.dispatch(getUsers()).then(() => {
        this.setState({
          selectedUser: Object.values(this.props.users)[0].id
        });
      });
    }

    if(!(Object.values(this.props.users).length === 0 || this.state.selectedUser)){
      this.setState({
        selectedUser: Object.values(this.props.users)[0].id
      });
    }
  }
  handleSelection(event) {
    event.preventDefault();
    event.persist();

    this.setState({
      selectedUser: event.target.value
    });
  }
  handleFormSubmission(event) {
    event.preventDefault();
    event.persist();

    const authedUser = event.target.elements['loginForm'].selectedOptions[0].value;

    if(authedUser){
      this.props.dispatch(setAuthedUser(authedUser));
    }
  }
  render() {
    return (
      <Fragment>
        <LoadingBar />
          <div className="Login mt-1 mx-md-auto">
            <h1 className="text-center">
              Welcome to <em>Would You Rather!</em>
            </h1>
            {
              !this.props.loading &&
              <div className="card">
                <div className="card-header">
                  <h2>Pick a user:</h2>
                </div>
                <form className="w-75 py-2 mx-auto" onSubmit={this.handleFormSubmission}>
                  <div className="form-group">
                    <select
                      className="form-control login-form"
                      name="loginForm"
                      onChange={this.handleSelection}
                      value={this.state.selectedUser}
                    >
                      {
                        Object.values(this.props.users).map((user) => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))
                      }
                    </select>
                    </div>
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
              </div>
            }
            </div>
      </Fragment>
    );
  }
}

function mapStateToProps ({ users }) {
  return {
    users,
    loading: users === undefined
  };
}

export default withRouter(connect(mapStateToProps)(Login));
