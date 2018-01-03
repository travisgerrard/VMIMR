import React, { Component } from 'react';
import { Card, Input, Icon, Image } from 'semantic-ui-react';
import RotationDropDown from './shared/RotationDropDown';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import LearningEdit from './LearningEdit';

class ConditionCardView extends Component {
  state = {
    conditionToAdd: this.props.conditions.searchTerm,
    tags: '',
    seenWith: '',
    date: moment().format('MM/DD/YY'),
    whatWasLearned: '',
    usersTagged: []
  };

  saveCondition = () => {
    this.props.addCondition({
      condition: this.state.conditionToAdd,
      tags: this.state.tags,
      learning: {
        seenWith: this.state.seenWith,
        usersTagged: this.state.usersTagged,
        tag: this.state.tags,
        date: this.state.date,
        whatWasLearned: this.state.whatWasLearned
      }
    });
  };

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Input
            label="Condition"
            placeholder="Ex: ARDS"
            value={this.state.conditionToAdd}
            onChange={(params, data) =>
              this.setState({
                conditionToAdd: data.value
              })
            }
          />
          <Image floated="right">
            <Icon
              name="remove"
              color="grey"
              style={{ cursor: 'pointer' }}
              onClick={this.props.hideCard}
            />
          </Image>
          <RotationDropDown
            multiple={true}
            inline={false}
            placeholder="Tags"
            onChange={(params, data) =>
              this.setState({
                tags: data.value
              })
            }
          />
        </Card.Content>
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
          saveOnClick={this.saveCondition}
          cancelOnClick={this.props.hideCard}
          showDeleteButton={this.props.learningId}
        />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(ConditionCardView);
