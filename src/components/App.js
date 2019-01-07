import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    // Load data depending on route
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <div className="App">
        {
          // Don't show anything until the loading has been disabled
          this.props.loading === true
          ? null
          : <Dashboard />
        }
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps ({ questions }) {
  return {
    loading: questions === null
  };
}

export default connect(mapStateToProps)(App);
