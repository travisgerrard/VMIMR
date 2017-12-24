// RotationConditionList
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import _ from 'lodash';
import ConditionCardView from './ConditionCardView';
import { Card } from 'semantic-ui-react';

class RotationConditionList extends Component {
  listOfConditions() {
    return _.map(this.props.conditions.filteredConditions, condition => {
      return (
        <ConditionCardView
          condition={condition}
          key={condition._id}
          conditionId={condition._id}
        />
      );
    });
  }

  render() {
    return <Card.Group>{this.listOfConditions()}</Card.Group>;
  }
}

function mapStateToProps(state) {
  console.log(state.conditions);
  return state;
}

export default connect(mapStateToProps, actions)(RotationConditionList);
