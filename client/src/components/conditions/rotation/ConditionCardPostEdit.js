import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import LearningEdit from './LearningEdit';

class ConditionCardPostEdit extends Component {
  state = {
    seenWith: this.props.seenWith ? this.props.seenWith : '',
    date: this.props.dateField
      ? this.props.dateField
      : moment().format('MM/DD/YY'),
    whatWasLearned: this.props.whatWasLearned ? this.props.whatWasLearned : '',
    usersTagged: []
  };

  saveLearning = () => {
    if (this.props.conditionId) {
      //New learning
      this.props.addLearningToCondition({
        seenWith: this.state.seenWith,
        date: this.state.date,
        whatWasLearned: this.state.whatWasLearned,
        usersTagged: this.state.usersTagged,
        conditionId: this.props.conditionId
      });
    }
    if (this.props.learningId) {
      //Updateing learning
      this.props.updateLearning({
        seenWith: this.state.seenWith,
        date: this.state.date,
        whatWasLearned: this.state.whatWasLearned,
        usersTagged: this.state.usersTagged,
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

  render() {
    return (
      <LearningEdit
        attendingLabel="Attending"
        dateLabel="Date"
        attendingValue={this.state.seenWith}
        dateValue={this.state.date}
        wwlValue={this.state.whatWasLearned}
        multiple={true}
        attendingPlaceholder="Ex: Baliga"
        userPlaceholder="Learned with"
        wwlPlaceholder="What was learned"
        attendingOnChange={(params, data) =>
          this.setState({
            seenWith: data.value
          })
        }
        dateOnChange={(params, data) =>
          this.setState({
            date: data.value
          })
        }
        userOnChange={(params, data) =>
          this.setState({
            usersTagged: data.value
          })
        }
        wwlOnChange={(params, data) =>
          this.setState({
            whatWasLearned: data.value
          })
        }
        saveOnClick={this.saveLearning}
        cancelOnClick={this.cancelLearning}
        deleteOnClick={this.deleteLearning}
        showDeleteButton={this.props.learningId}
      />
    );
  }
}

export default connect(null, actions)(ConditionCardPostEdit);
