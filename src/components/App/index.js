import { setAuthedUser } from '../../actions/authedUser';
import './style.css';
import Dashboard from '../Dashboard/index';
import Nav from '../Nav/index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const AUTHED_ID = 'tylermcginnis';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(setAuthedUser(AUTHED_ID));
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Route path='/' exact component={Dashboard} />
        </div>
      </Router>
    );
  }
};

export default connect()(App);
