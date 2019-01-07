import React from 'react';
import { connect } from 'react-redux';

const QuestionPreview = (props) => {
  return (
    <div class="QuestionPreview">
      Question Author: {props.question.author}
    </div>
  );
};

function mapStateToProps ({questions}, { id }) {
  const question = questions[id];

  return {
    question
  };
}

export default connect(mapStateToProps)(QuestionPreview);
