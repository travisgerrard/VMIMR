import React, { Component } from 'react';
import { Button, Card, Input, TextArea, Form } from 'semantic-ui-react';
import moment from 'moment';

class ConditionCardPostEdit extends Component {
  render() {
    return (
      <Card.Content>
        <Input label="Seen With" placeholder="Ex: Baliga" />
        <Input label="Date" defaultValue={moment().format('MM/DD/YY')} />
        <Form>
          <TextArea autoHeight placeholder="What was learned" />
        </Form>
      </Card.Content>
    );
  }
}

export default ConditionCardPostEdit;
