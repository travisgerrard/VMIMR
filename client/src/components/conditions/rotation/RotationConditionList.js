// RotationConditionList
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import _ from 'lodash';
import ConditionCardView from './ConditionCardView';
import { Card } from 'semantic-ui-react';

class RotationConditionList extends Component {
  // returns true if any learning in condition is created by a user or a user is tagged in it's learning
  containsLearningWithUser(learnings, user) {
    var containsLearningCreatedByUser = false;
    _.forEach(learnings, learning => {
      if (learning._creator === user) {
        containsLearningCreatedByUser = true;
      }
      if (_.includes(learning.usersTagged, user)) {
        containsLearningCreatedByUser = true;
      }
    });
    return containsLearningCreatedByUser;
  }

  listOfConditions() {
    var { filteredConditions } = this.props.conditions;
    var { conditionFilter } = this.props;

    if (conditionFilter === 'all') {
      return _.map(filteredConditions, condition => {
        return (
          <ConditionCardView
            condition={condition}
            key={condition._id}
            conditionId={condition._id}
            canEdit={true}
            conditionFilter={conditionFilter}
          />
        );
      });
    } else {
      // if we are filtering for only conditions where current user has learning
      var userNumber = this.props.auth.userDetails.sub;

      //First filter conditions to only show places where user has learning
      var personalList = _.filter(filteredConditions, condition => {
        return this.containsLearningWithUser(condition._learnings, userNumber);
      });

      //actually need to remove the learnings that user is not apart of one layer up in the ConditionCardLearningView
      //This is why the prop conditionFilter was added
      return _.map(_.compact(personalList), condition => {
        return (
          <ConditionCardView
            condition={condition}
            key={condition._id}
            conditionId={condition._id}
            canEdit={true}
            conditionFilter={conditionFilter}
          />
        );
      });
    }
  }

  render() {
    return (
      <Card.Group itemsPerRow={3} stackable doubling>
        {this.listOfConditions()}
      </Card.Group>
    );
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
