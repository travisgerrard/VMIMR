import React, { Component } from 'react';
import { Button, Card, Input, TextArea, Form } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ConditionCardPostEdit extends Component {
  state = {
    seenWith: '',
    date: moment().format('MM/DD/YY'),
    whatWasLearned: ''
  };

  saveLearning = () => {
    this.props.addLearningToCondition({
      seenWith: this.state.seenWith,
      date: this.state.date,
      whatWasLearned: this.state.whatWasLearned,
      conditionId: this.props.conditionId
    });
  };

  cancelLearning = () => {
    this.props.cancelLearning();
  };

  render() {
    return (
      <Card.Content>
        <Input
          label="Seen With"
          placeholder="Ex: Baliga"
          value={this.state.seenWith}
          onChange={(params, data) =>
            this.setState({
              seenWith: data.value
            })
          }
        />
        <Input
          label="Date"
          value={this.state.date}
          onChange={(params, data) =>
            this.setState({
              date: data.value
            })
          }
        />
        <Form>
          <TextArea
            autoHeight
            placeholder="What was learned"
            value={this.state.whatWasLearned}
            onChange={(params, data) =>
              this.setState({
                whatWasLearned: data.value
              })
            }
          />
        </Form>
        <div className="ui two buttons">
          <Button basic color="green" onClick={this.saveLearning}>
            Save
          </Button>
          <Button basic color="red" onClick={this.cancelLearning}>
            Cancel
          </Button>
        </div>
      </Card.Content>
    );
  }
}

export default connect(null, actions)(ConditionCardPostEdit);
