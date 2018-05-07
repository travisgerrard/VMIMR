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
              Which of the following imaging studies has the highest sensitivity
              and specificity for the diagnosis of bowel perforation?
            </h2>
            <List as="ol">
              <List.Item as="li">Ultrasound</List.Item>
              <List.Item as="li">Chest x-ray</List.Item>
              <List.Item as="li">Abdominal x-ray</List.Item>
              <List.Item as="li">
                {this.state.answerFirstQuestion ? (
                  <b>CT abdomen</b>
                ) : (
                  <p>CT abdomen</p>
                )}
              </List.Item>
            </List>
            <Button
              onClick={() => this.setState({ answerFirstQuestion: false })}
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
              Which of the following drug regimens is most appropriate for this
              patient?
            </h2>
            <List as="ol">
              <List.Item as="li">Isoniazid, rifampin</List.Item>
              <List.Item as="li">
                {this.state.answerSecondQuestion ? (
                  <b>Isoniazid, rifampin, ethambutol</b>
                ) : (
                  <p>Isoniazid, rifampin, ethambutol</p>
                )}
              </List.Item>
              <List.Item as="li">Isoniazid, rifampin, pyrazinadmide</List.Item>
              <List.Item as="li">
                Isoniazid, rifampin, pyrazinadmide, ethambutol
              </List.Item>
              <List.Item as="li">
                Isoniazid, rifampin, pyrazinadmide, ethambutol, prednisone
              </List.Item>
            </List>
            <Button
              onClick={() => this.setState({ answerSecondQuestion: false })}
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
