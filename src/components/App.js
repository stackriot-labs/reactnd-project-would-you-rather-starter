import { setAuthedUser } from '../actions/authedUser';
import Dashboard from './Dashboard';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const AUTHED_ID = 'tylermcginnis';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(setAuthedUser(AUTHED_ID));
  }
  render() {
    return (
      <div className="App">
      {
        <Dashboard />
      }
      </div>
    );
  }
};

export default connect()(App);
