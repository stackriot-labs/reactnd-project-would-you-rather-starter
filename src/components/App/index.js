import { setAuthedUser } from '../../actions/authedUser';
import Dashboard from '../Dashboard/index';
import Leaderboard from '../Leaderboard/index';
import AddQuestion from '../AddQuestion/index';
import Nav from '../Nav/index';
import QuestionPage from '../QuestionPage/index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.css';

const AUTHED_ID = 'tylermcginnis';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(setAuthedUser(AUTHED_ID));
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Nav user={this.props.user} />
          <Route path='/' exact component={Dashboard} />
          <Route path='/question/:id' component={QuestionPage} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/add' component={AddQuestion} />
        </div>
      </Router>
    );
  }
};

function mapStateToProps ({ authedUser, users }) {
  return {
    user: users[authedUser]
  };
}

export default connect(mapStateToProps)(App);
