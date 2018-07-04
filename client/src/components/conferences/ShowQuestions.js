import React, { Component } from 'react';
import ShowQuestion from './ShowQuestion';

class ShowQuestions extends Component {
  render() {
    return (
      <div>
        {this.props.questions.map(
          ({ questionStem, options, answers, questionAnswerText, id }) => {
            return (
              <ShowQuestion
                key={id}
                questionId={id}
                questionStem={questionStem}
                questionAnswerText={questionAnswerText}
                options={options}
                answers={answers}
                caseId={this.props.caseId}
                abilityToEdit={this.props.abilityToEdit}
                addQuestionToCase={this.props.addQuestionToCase}
                deleteQuestion={this.props.deleteQuestion}
              />
            );
          },
        )}
      </div>
    );
  }
}

export default ShowQuestions;
