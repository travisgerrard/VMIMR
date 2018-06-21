import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';

import AddQuestion from './AddQuestion';
import ShowQuestions from './ShowQuestions';

// Props: abilityToEdit

class Question extends Component {
  addQuestion = () => {
    console.log('was clicked');
  };

  render() {
    console.log(this.props.abilityToEdit);

    return (
      <Container textAlign="left" style={{ marginBottom: 10 }}>
        <Segment>
          <ShowQuestions questions={this.props.questions} />
          <br />
          {this.props.abilityToEdit && (
            <AddQuestion caseId={this.props.caseId} />
          )}
        </Segment>
      </Container>
    );
  }
}

export default Question;
