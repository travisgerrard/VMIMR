import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';

class OpenEndedQuestion extends Component {
  render() {
    return (
      <Segment>
        <Form>
          <label>{this.props.question}</label>
          <Form.TextArea
            value={this.props.value}
            onChange={e => this.props.onChange(e)}
          />
        </Form>
      </Segment>
    );
  }
}

export default OpenEndedQuestion;
