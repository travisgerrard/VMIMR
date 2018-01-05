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

    // Sort filteredConditions so conditions with learnings show up first.
    filteredConditions.sort(function(a, b) {
      var x = a._learnings.length;
      var y = b._learnings.length;
      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    });

    // Sort filteredConditions so most recent learnings show up first.
    filteredConditions.sort(function(a, b) {
      if (a._learnings.length > 0 && b._learnings.length > 0) {
        var x = a._learnings[0].dateUpdated;
        var y = b._learnings[0].dateUpdated;
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      }
      return 0;
    });

    return _.map(filteredConditions, condition => {
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
  return state;
}

export default connect(mapStateToProps, actions)(RotationConditionList);
