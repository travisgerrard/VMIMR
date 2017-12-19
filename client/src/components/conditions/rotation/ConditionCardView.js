import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import ConditionCardLearningView from './ConditionCardLearningView';
import _ from 'lodash';

class ConditionCardView extends Component {
  conditionLearnings = () => {
    if (this.props.condition._learnings.length > 0) {
      return _.map(this.props.condition._learnings, learning => {
        return <ConditionCardLearningView {...learning} key={learning._id} />;
      });
    }
  };

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.condition.condition}</Card.Header>
          <Card.Meta>Tags: {this.props.condition.tags.join(', ')}</Card.Meta>
        </Card.Content>
        {this.conditionLearnings()}
      </Card>
    );
  }
}

export default ConditionCardView;
