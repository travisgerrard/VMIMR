import React, { Component } from 'react';
import { Container, Segment, Button, Message } from 'semantic-ui-react';

import OneToTenQuestion from './OneToTenQuestion';
import OpenEndedQuestion from './OpenEndedQuestion';

class SurveyTopLevel extends Component {
  state = {
    valueOne: '',
    valueTwo: '',
    valueThree: '',
    valueFour: '',
    error: '',
  };

  submitClicked = () => {
    const { valueOne, valueTwo, valueThree, valueFour } = this.state;
    if (valueOne === '' || valueTwo === '' || valueThree === '') {
      this.setState({
        error: 'Need to select a number from 0 to 10 in all three fields.',
      });
    } else {
      // Need to use prop/mutation submitSurvey here.
      this.props.submitSurvey({
        variables: {
          valueOne,
          valueTwo,
          valueThree,
          valueFour,
        },
      });
    }
  };

  render() {
    return (
      <Container textAlign="center" style={{ marginTop: 10, marginBottom: 10 }}>
        <Segment>
          <h1>VMIMR Survey</h1>
          <OneToTenQuestion
            onChange={value => this.setState({ valueOne: value })}
            value={this.state.valueOne}
            question={`From 0 - 10, how much time do you feel you are learning on Wards (0 = not at all, 5 = just the right amount, 10 = as much as possible/too much)`}
          />
          <OneToTenQuestion
            onChange={value => this.setState({ valueTwo: value })}
            value={this.state.valueTwo}
            question={`From 0 - 10 how satisfied are you with the work to learning ratio on Wards? (0 = Not at all satisfied, 10 = Very satisfied)`}
          />
          <OneToTenQuestion
            onChange={value => this.setState({ valueThree: value })}
            value={this.state.valueThree}
            question={`From 0 - 10, how accurate do you feel you are in gauging how much you learn? (0 = I do not realize when I am learning something, 10 = I am always aware of when I am learning something)`}
          />
          <OpenEndedQuestion
            onChange={e => this.setState({ valueFour: e.target.value })}
            value={this.state.valueFour}
            question={`Currently, how do you keep track of what you've learned? (i.e. Memory alone, notebook, note cards, application)`}
          />
          {this.state.error && (
            <Message negative>
              <Message.Header>Field missing</Message.Header>
              {this.state.error}
            </Message>
          )}
          <Button primary onClick={() => this.submitClicked()}>
            Submit
          </Button>
          <Button onClick={() => this.props.cancel()}>Cancel</Button>
        </Segment>
      </Container>
    );
  }
}

export default SurveyTopLevel;
