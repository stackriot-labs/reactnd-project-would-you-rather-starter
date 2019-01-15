import { questionOptionNames } from '../index';
import React from 'react';

const questionPreamble = "Would you rather ";
const interrogativeMarker = '?';
const percentageMarker = '%';

const Results = (props) => {
  return (
    <div>
      <h2>Results</h2>
        {
          questionOptionNames.map((optionName) => {
            const rawPercentage = ( props[optionName] * 100 ) / ( props.voteTotal * 100 ) * 100;
            const percentage = Number.isInteger(rawPercentage) ? rawPercentage : rawPercentage.toFixed(2);
            return <div className={`card${props.myOption === optionName ? ' bg-success' : ''}`} key={optionName}>
                    <div className="card-body">
                      <h5 className="card-title">
                        {`${questionPreamble}${props.question[optionName].text}${interrogativeMarker}`}
                      </h5>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{width: `${percentage}${percentageMarker}`}}
                          aria-valuenow={percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {`${percentage}${percentageMarker}`}
                        </div>
                      </div>
                      <div className="card-text">{props[optionName]} out of {props.voteTotal}</div>
                    </div>
                  </div>;
          })
        }
    </div>
  );
};

export default Results;
