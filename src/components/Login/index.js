import { setAuthedUser } from '../../actions/authedUser';
import { getUsers } from '../../actions/users';
import React, { Component, Fragment } from 'react';
import { FaQuestionCircle } from "react-icons/fa";
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
          <div
              id="welcomeModal"
              className="modal fade"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
          >
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">Welcome!</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                          <p>This is a small demo project I made for the React Nanodegree.</p>
                          <p>Login in as a user from the drop down. The homepage is a dashboard where you can view answered and
                              unanswered questions. The questions are all in the form of "Would you rather..." (e.g. "learn Swift or learn Javascript?").</p>
                          <p>Click <i>Add a Question</i> to add a new question.</p>
                          <p>Click <i>Leaderboards</i> to view users' scores, which are based on how many questions they've asked and answered.</p>
                          <p>You can also <i>Logout</i>.</p>
                          <p>Please note that since this is just a small demo project, all site data is cleared whenever you refresh a page or visit a URL by typing it in.</p>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="Login mt-1 mx-md-auto">
            <h1 className="text-center">
              Welcome to <em>Would You Rather!</em>
              <button data-toggle="modal" data-target="#welcomeModal" class="btn btn-link">
                  <FaQuestionCircle color="#0069D9" />
              </button>
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
