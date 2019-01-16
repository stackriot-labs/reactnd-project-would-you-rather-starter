import { removeAuthedUser } from '../../actions/authedUser';
import Dashboard from '../Dashboard/index';
import Leaderboard from '../Leaderboard/index';
import Login from '../Login/index';
import AddQuestion from '../AddQuestion/index';
import Nav from '../Nav/index';
import QuestionPage from '../QuestionPage/index';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './style.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {
            this.props.authedUser ?
              <Fragment>
                <Nav user={this.props.user} />
                <Route path='/' exact component={Dashboard} />
                <Route path='/question/:id' component={QuestionPage} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/add' component={AddQuestion} />
                <Route path='/logout' render={() => {
                  this.props.dispatch(removeAuthedUser());

                  return <Redirect to='/' />;
                }} />
              </Fragment>
            :
              <Login />
          }
        </div>
      </Router>
    );
  }
};

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    user: users[authedUser]
  };
}

export default connect(mapStateToProps)(App);
