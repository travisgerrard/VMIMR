import React, { Component } from 'react';
import { Container, Segment, List, Button } from 'semantic-ui-react';

class Question extends Component {
  state = {
    revealFirstQuestion: false,
    answerFirstQuestion: false,
    revealSecondQuestion: false,
    answerSecondQuestion: false,
  };

  questionNotAnswer = text => {
    return <List.Item as="li">{text}</List.Item>;
  };

  questionOneAnswer = text => {
    return (
      <List.Item as="li">
        {this.state.answerFirstQuestion ? <b>{text}</b> : <p>{text}</p>}
      </List.Item>
    );
  };

  questionTwoAnswer = text => {
    return (
      <List.Item as="li">
        {this.state.answerSecondQuestion ? <b>{text}</b> : <p>{text}</p>}
      </List.Item>
    );
  };

  questionOne = () => {
    if (this.state.revealFirstQuestion) {
      return (
        <Container>
          <Segment>
            <h2>
              What of the following would NOT be an initial test to order for
              chronic diarrhea?
            </h2>
            <List as="ol">
              {this.questionNotAnswer('CBC, CMR')}
              {this.questionNotAnswer('ESR, CRP')}
              {this.questionOneAnswer('Colonoscopy')}
              {this.questionNotAnswer('TSH')}
              {this.questionNotAnswer(`Screen for celiac's dx`)}
            </List>
            <Button
              onClick={() => this.setState({ answerFirstQuestion: true })}
            >
              Submit
            </Button>
          </Segment>
        </Container>
      );
    } else {
      return (
        <Container textAlign="center">
          <Button onClick={() => this.setState({ revealFirstQuestion: true })}>
            Reveal Question #1
          </Button>{' '}
        </Container>
      );
    }
  };

  questionTwo = () => {
    if (this.state.revealSecondQuestion) {
      return (
        <Container>
          <Segment>
            <h2>
              What percent of pt’s with IBS report physical or sexual abuse?
            </h2>
            <List as="ol">
              {this.questionNotAnswer('0 - 33%')}
              {this.questionNotAnswer('33% - 50%')}
              {this.questionTwoAnswer('50% - 66%')}
              {this.questionNotAnswer('66% - 100%')}
            </List>
            <Button
              onClick={() => this.setState({ answerSecondQuestion: true })}
            >
              Submit
            </Button>
          </Segment>
        </Container>
      );
    } else {
      return (
        <Container textAlign="center">
          <Button onClick={() => this.setState({ revealSecondQuestion: true })}>
            Reveal Question #2
          </Button>{' '}
        </Container>
      );
    }
  };

  render() {
    return (
      <div>
        {this.questionOne()}
        <br />
        {this.questionTwo()}
        <br />
      </div>
    );
  }
}

export default Question;
