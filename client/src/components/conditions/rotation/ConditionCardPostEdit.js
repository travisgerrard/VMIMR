import React, { Component } from 'react';
import { Button, Card, Input, TextArea, Form } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import UserDropDown from './shared/UserDropDown';

class ConditionCardPostEdit extends Component {
  state = {
    seenWith: this.props.seenWith ? this.props.seenWith : '',
    date: this.props.dateField
      ? this.props.dateField
      : moment().format('MM/DD/YY'),
    whatWasLearned: this.props.whatWasLearned ? this.props.whatWasLearned : ''
  };

  saveLearning = () => {
    if (this.props.conditionId) {
      this.props.addLearningToCondition({
        seenWith: this.state.seenWith,
        date: this.state.date,
        whatWasLearned: this.state.whatWasLearned,
        conditionId: this.props.conditionId
      });
    }
    if (this.props.learningId) {
      this.props.updateLearning({
        seenWith: this.state.seenWith,
        date: this.state.date,
        whatWasLearned: this.state.whatWasLearned,
        learningId: this.props.learningId
      });
    }
  };

  cancelLearning = () => {
    this.props.cancelLearning();
  };

  deleteLearning = () => {
    if (this.props.learningId) {
      this.props.deleteLearning(this.props.learningId);
    }
  };

  showDeleteButton = () => {
    if (this.props.learningId) {
      return (
        <Button basic color="red" onClick={this.deleteLearning}>
          Delete
        </Button>
      );
    }
  };

  render() {
    console.log(this.props.conditionId);
    return (
      <Card.Content>
        <Input
          label="Attending"
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
        <UserDropDown
          multiple={true}
          onChange={(params, data) => console.log(data.value)}
          placeholder="Learned with"
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
        <div className="ui three buttons">
          <Button basic color="green" onClick={this.saveLearning}>
            Save
          </Button>
          <Button basic color="grey" onClick={this.cancelLearning}>
            Cancel
          </Button>
          {this.showDeleteButton()}
        </div>
      </Card.Content>
    );
  }
}

export default connect(null, actions)(ConditionCardPostEdit);
