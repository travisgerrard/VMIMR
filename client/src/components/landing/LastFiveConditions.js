import React, { Component } from 'react';
import ConditionCardView from '../conditions/rotation/ConditionCardView';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import * as actions from '../../actions';
import _ from 'lodash';

class LastFiveConditions extends Component {
  componentWillMount() {
    this.props.fetchLastFiveConditions();
  }

  listOfConditions() {
    return _.map(this.props.landing, condition => {
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
    return (
      <div>
        <p>Last Five</p>
        <Card.Group>{this.listOfConditions()}</Card.Group>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.landing);
  return state;
}

export default connect(mapStateToProps, actions)(LastFiveConditions);
