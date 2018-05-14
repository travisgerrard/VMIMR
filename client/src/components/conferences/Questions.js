import React, { Component } from 'react';
import { Container, Segment, Modal, List, Button } from 'semantic-ui-react';

import AddQuestion from './AddQuestion';

class Question extends Component {
  addQuestion = () => {
    console.log('was clicked');
  };

  render() {
    return (
      <Container textAlign="center" style={{ marginBottom: 10 }}>
        <AddQuestion caseId={this.props.caseId} />
      </Container>
    );
  }
}

export default Question;
