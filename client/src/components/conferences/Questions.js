import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';

import AddQuestion from './AddQuestion';
import ShowQuestions from './ShowQuestions';

// Props: abilityToEdit

class Question extends Component {
  render() {
    const { abilityToEdit, deleteQuestion, addQuestionToCase } = this.props;

    return (
      <Container textAlign="left" style={{ marginBottom: 10 }}>
        <Segment>
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
        </Segment>
      </Container>
    );
  }
}

export default Question;
