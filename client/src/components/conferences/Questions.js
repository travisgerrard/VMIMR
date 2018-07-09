import React, { Component } from 'react';
import { Container, Segment, Divider } from 'semantic-ui-react';

import AddQuestion from './AddQuestion';
import ShowQuestions from './ShowQuestions';

// Props: abilityToEdit

class Question extends Component {
  render() {
    const { abilityToEdit, deleteQuestion, addQuestionToCase } = this.props;

    return (
      <Container textAlign="left" style={{ marginBottom: 10 }}>
        <Divider />
        <h2>Questions</h2>
        <ShowQuestions
          questions={this.props.questions}
          abilityToEdit={abilityToEdit}
          caseId={this.props.caseId}
          deleteQuestion={deleteQuestion}
          addQuestionToCase={addQuestionToCase}
        />
        <br />
        {abilityToEdit && (
          <AddQuestion
            buttonText={`Add Question`}
            caseId={this.props.caseId}
            addQuestionToCase={this.props.addQuestionToCase}
          />
        )}
      </Container>
    );
  }
}

export default Question;
