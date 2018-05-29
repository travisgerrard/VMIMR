import React, { Component } from 'react';
import { Container, Segment, Button } from 'semantic-ui-react';

import OneToTenQuestion from './OneToTenQuestion';
import OpenEndedQuestion from './OpenEndedQuestion';

class SurveyTopLevel extends Component {
  state = { valueOne: '', valueTwo: '', valueThree: '', valueFour: '' };

  submitClicked = () => {
    const { valueOne, valueTwo, valueThree, valueFour } = this.state;
    console.log(valueOne, valueTwo, valueThree, valueFour);
  };

  render() {
    return (
      <Container textAlign="center" style={{ marginTop: 10 }}>
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
            question={`From 0 - 10 how satisfied are you with the work to learning ratio on Wards`}
          />
          <OneToTenQuestion
            onChange={value => this.setState({ valueThree: value })}
            value={this.state.valueThree}
            question={`From 0 - 10, how accurate do you feel you are you in gauging how much you learn?`}
          />
          <OpenEndedQuestion
            onChange={e => this.setState({ valueFour: e.target.value })}
            value={this.state.valueFour}
            question={`Currently, how do you keep track of what you've learned? (i.e. Memory alone, notebook, note cards, application)`}
          />
          <Button onClick={() => this.submitClicked()}>Submit</Button>
        </Segment>
      </Container>
    );
  }
}

export default SurveyTopLevel;
