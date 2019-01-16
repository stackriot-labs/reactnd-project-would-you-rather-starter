import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddQuestion extends Component {
  render() {
    return (
      <form>
        <h2>Create a New Question</h2>
      </form>
    );
  }
}

const mapStateToProps = ({authedUser}) => (
  {
    authedUser
  }
);

export default connect(mapStateToProps)(AddQuestion);
