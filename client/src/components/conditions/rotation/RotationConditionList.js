import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import _ from 'lodash';
import ConditionCardView from './ConditionCardView';
import { Card } from 'semantic-ui-react';

class RotationConditionList extends Component {
  listOfConditions() {
    // If there is a search term, map over filtered conditions
    if (this.props.conditions.searchTerm === '') {
      //console.log(this.props.conditions);
      return _.map(this.props.conditions, condition => {
        if (
          _.indexOf(condition.tags, this.props.conditions.rotationSelected) >= 0
        ) {
          return (
            <ConditionCardView condition={condition} key={condition._id} />
          );
        }
      });
    } else {
      //console.log(this.props.conditions);
      return _.map(this.props.conditions.filteredConditions, condition => {
        return <ConditionCardView condition={condition} key={condition._id} />;
      });
    }
  }

  render() {
    return <Card.Group>{this.listOfConditions()}</Card.Group>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(RotationConditionList);
