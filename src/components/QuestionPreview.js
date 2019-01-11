import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const QuestionPreview = (props) => {
  return (
    !props.loading &&
    <div className="QuestionPreview card">
      <div className="card-header">
        <strong>
          {props.author.name} asks...
        </strong>
      </div>
      <div className="card-body">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-3 avatar">
                <img src={`${props.author.avatarURL}`} alt={`${props.author.name}'s avatar`} className="mw-100" />
            </div>
            <div className="col-9">
              <p className="card-text">
                <strong>
                  Would you rather...
                </strong>
              </p>
              <p className="card-text">
                {`${props.question.optionOne.text}...`}
              </p>
              <Link className="btn btn-outline-primary btn-block" to={`/question/${props.question.id}`}>View Poll</Link>
            </div>
          </div>
        </div>
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
