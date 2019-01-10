import React from 'react';
import { connect } from 'react-redux';

const QuestionPreview = (props) => {
  return (
    !props.loading &&
    <div className="QuestionPreview card">
      <div className="card-header">
        {props.author.name} asks...
      </div>
      <div class="card-body">
        Would you rather...
      </div>
    </div>
  );
};

function mapStateToProps ({questions, users}, { id }) {
  const question = questions[id];
  const author = users[question.author];

  return {
    question,
    author,
    loading: author === undefined
  };
}

export default connect(mapStateToProps)(QuestionPreview);
