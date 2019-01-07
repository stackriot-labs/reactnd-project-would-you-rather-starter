import React from 'react';
import { connect } from 'react-redux';
import QuestionPreview from './QuestionPreview';

const Dashboard = (props) => {
    return (
      <div className="Dashboard">
        <ul class="nav nav-tabs" id="questionTabs" role="tablist">
          {
            Object.keys(props.questions).map((questionType) => (
              <li class="nav-item" key={questionType}>
                <a
                  class="nav-link active"
                  id={`${questionType}-tab`}
                  data-toggle="tab"
                  href={`#${questionType}`}
                  role="tab"
                  aria-controls={questionType}
                  aria-selected="true">
                  {questionType.toUpperCase()}
                </a>
              </li>
            ))
          }
        </ul>
        <div class="tab-content" id="questionTabsContent">
          {
            props.questionIds.map((id) => (
              <QuestionPreview id={id}/>
            ))
          }
        </div>
      </div>
    );
};

function mapStateToProps ({ questions }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  };
}

export default connect(mapStateToProps)(Dashboard);
