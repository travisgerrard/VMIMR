import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ConditionCardView from './ConditionCardView';
import { Card } from 'semantic-ui-react';

class RotationConditionList extends Component {
  listOfConditions() {
    const conditions = this.props.conditions;
    return _.map(conditions, condition => {
      if (_.indexOf(condition.tags, this.props.dbname) >= 0) {
        return <ConditionCardView condition={condition} key={condition._id} />;
      }
    });
  }

  render() {
    return <Card.Group>{this.listOfConditions()}</Card.Group>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RotationConditionList);
