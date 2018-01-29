// RotationConditionList
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import _ from 'lodash';
import ConditionCardView from './ConditionCardView';
import { Card } from 'semantic-ui-react';

class RotationConditionList extends Component {
  listOfConditions() {
    var { filteredConditions } = this.props.conditions;

    return _.map(filteredConditions, condition => {
      return (
        <ConditionCardView
          condition={condition}
          key={condition._id}
          conditionId={condition._id}
          canEdit={true}
        />
      );
    });
  }

  render() {
    return <Card.Group>{this.listOfConditions()}</Card.Group>;
  }
}

function mapStateToProps(state) {
  //Sort filteredConditions so the ones with newest learnings are first
  state.conditions.filteredConditions.sort(function(a, b) {
    if (a._learnings.length > 0 && b._learnings.length > 0) {
      var x = a._learnings[0].dateUpdated;
      var y = b._learnings[0].dateUpdated;

      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
    } else if (a._learnings.length > 0 && b._learnings.length === 0) {
      return -1;
    } else if (a._learnings.length === 0 && b._learnings.length > 0) {
      return 1;
    } else {
      return 0;
    }
    return 0;
  });
  return state;
}

export default connect(mapStateToProps, actions)(RotationConditionList);
