import React, { Component } from 'react';
import ShowQuestion from './ShowQuestion';

class ShowQuestions extends Component {
  render() {
    return (
      <div>
        {this.props.questions.map(({ questionStem, options, answers }) => {
          return (
            <ShowQuestion
              key={questionStem}
              questionStem={questionStem}
              options={options}
              answers={answers}
            />
          );
        })}
      </div>
    );
  }
}

export default ShowQuestions;
