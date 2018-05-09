import React, { Component } from 'react';
import { Container, Segment, List, Button } from 'semantic-ui-react';

class Question extends Component {
  state = {
    revealFirstQuestion: false,
    answerFirstQuestion: false,
    revealSecondQuestion: false,
    answerSecondQuestion: false,
  };

  questionOne = () => {
    if (this.state.revealFirstQuestion) {
      return (
        <Container>
          <Segment>
            <h2>
              Which of the following skin findings is typical of
              dermatomyositis? (Choose all that are correct).
            </h2>
            <List as="ol">
              <List.Item as="li">
                {this.state.answerFirstQuestion ? <b>A</b> : <p>A</p>}
              </List.Item>
              <List.Item as="li">
                {this.state.answerFirstQuestion ? <b>B</b> : <p>B</p>}
              </List.Item>
              <List.Item as="li">C</List.Item>
              <List.Item as="li">D</List.Item>
              <List.Item as="li">
                {this.state.answerFirstQuestion ? <b>E</b> : <p>E</p>}
              </List.Item>
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
            Reveal Qestion #1
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
              Which of the following is NOT a risk factor for statin induced
              myopathy?
            </h2>
            <List as="ol">
              <List.Item as="li">Female sex</List.Item>
              <List.Item as="li">CKD</List.Item>
              <List.Item as="li">
                {this.state.answerSecondQuestion ? (
                  <b>{`Age < 50`}</b>
                ) : (
                  <p>{`Age < 50`}</p>
                )}
              </List.Item>
              <List.Item as="li">Excessive alcohol use</List.Item>
              <List.Item as="li">
                Excessive grapefruit juice consumption
              </List.Item>
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
            Reveal Qestion #2
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
