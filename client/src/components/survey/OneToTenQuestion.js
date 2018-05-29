// Shows a 0 to 10 options
// Props are value, question & onChange

import React, { Component } from 'react';
import { Form, Segment, Grid } from 'semantic-ui-react';

class OneToTenQuestion extends Component {
  state = { value: '' };

  handleChange = value => this.setState({ value });

  radiosFromZeroToTen = () => {
    let { value } = this.props;
    let oneToZero = [];

    for (let index = 0; index <= 10; index++) {
      oneToZero.push(
        <Form.Radio
          key={index}
          label={index.toString()}
          value={value}
          checked={value === index.toString()}
          onChange={() => this.props.onChange(index.toString())}
        />,
      );
    }

    return oneToZero.map(form => {
      return form;
    });
  };

  render() {
    return (
      <Segment>
        <Form>
          <label>{this.props.question}</label>
          <Grid style={{ marginTop: 10 }}>
            <Grid.Row centered>
              <Grid.Column width={8}>
                <Form.Group inline>{this.radiosFromZeroToTen()}</Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

export default OneToTenQuestion;
