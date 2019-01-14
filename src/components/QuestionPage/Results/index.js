import { questionOptionNames } from '../index';
import React from 'react';

const questionPreamble = "Would you rather ";
const interrogativeMarker = '?';

const Results = (props) => {
  return (
    <div>
      <h2>Results</h2>
        {
          questionOptionNames.map((optionName) => (
            <div className="card">
              <div class="card-body">
                <h5 class="card-title">{`${questionPreamble}${props.question[optionName].text}${interrogativeMarker}`}</h5>
              </div>
            </div>
          ))
        }
    </div>
  );
};

export default Results;
