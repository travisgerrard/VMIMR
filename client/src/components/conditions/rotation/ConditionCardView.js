import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import ConditionCardLearningView from './ConditionCardLearningView';
import ConditionCardPostEdit from './ConditionCardPostEdit';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class ConditionCardView extends Component {
  state = {
    editing: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      editing: false
    });
  }

  conditionLearnings = () => {
    if (this.props.condition._learnings.length > 0) {
      return _.map(this.props.condition._learnings, learning => {
        return (
          <ConditionCardLearningView
            {...learning}
            key={learning._id}
            learningId={learning._id}
            canEdit={this.props.canEdit}
          />
        );
      });
    }
  };

  editingToTrue = () => {
    this.setState({
      editing: true
    });
  };

  editingToFalse = () => {
    this.setState({
      editing: false
    });
  };

  editLearning = () => {
    if (this.state.editing) {
      return (
        <Card.Content>
          <ConditionCardPostEdit
            cancelLearning={this.editingToFalse}
            conditionId={this.props.conditionId}
          />
        </Card.Content>
      );
    } else {
      return (
        <Card.Content extra>
          <Image floated="left" style={{ margin: '0px' }}>
            <Icon
              name="add"
              color="green"
              style={{ cursor: 'pointer' }}
              onClick={this.editingToTrue}
            />
          </Image>
          <Image floated="right">
            <Link to={`/conditions/condition/${this.props.conditionId}`}>
              <Icon
                name="arrow right"
                color="green"
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </Image>
        </Card.Content>
      );
    }
  };

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>{this.props.condition.condition}</Card.Header>
          <Card.Meta>Tags: {this.props.condition.tags.join(', ')}</Card.Meta>
        </Card.Content>
        {this.conditionLearnings()}
        {this.editLearning()}
      </Card>
    );
  }
}

export default ConditionCardView;
