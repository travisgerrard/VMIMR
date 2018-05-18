import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';

import AddQuestion from './AddQuestion';
import ShowQuestions from './ShowQuestions';

class Question extends Component {
  addQuestion = () => {
    console.log('was clicked');
  };

  render() {
    return (
      <Container textAlign="left" style={{ marginBottom: 10 }}>
        <Segment>
          <ShowQuestions questions={this.props.questions} />
          <br />
          <AddQuestion caseId={this.props.caseId} />
        </Segment>
      </Container>
    );
  }
}

export default Question;
