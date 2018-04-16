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
              What is the best next test to obtain to help narrow your
              differential?
            </h2>
            <List as="ol">
              <List.Item as="li">Ionized Calcium</List.Item>
              <List.Item as="li">Abdominal US</List.Item>
              <List.Item as="li">Pre-albumin</List.Item>
              <List.Item as="li">Gamma-glutamyl transpeptidase (GGT)</List.Item>
              <List.Item as="li">
                {this.state.answerFirstQuestion ? (
                  <b>Fractionated bilirubin</b>
                ) : (
                  <p>Fractionated bilirubin</p>
                )}
              </List.Item>
              <List.Item as="li">Abdominal CT scan</List.Item>
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
              What is the next best step in treatment of this patient’s
              hypercalcemia?
            </h2>
            <List as="ol">
              <List.Item as="li">
                No treatment is necessary at this time
              </List.Item>
              <List.Item as="li">
                {this.state.answerSecondQuestion ? (
                  <b>IV fluids</b>
                ) : (
                  <p>IV fluids</p>
                )}
              </List.Item>
              <List.Item as="li">Furosemide</List.Item>
              <List.Item as="li">Calcitonin</List.Item>
              <List.Item as="li">Zoledronic acid</List.Item>
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
