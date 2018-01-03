import React, { Component } from 'react';
import ConditionCardView from '../conditions/rotation/ConditionCardView';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LastFiveConditions extends Component {
  componentWillMount() {
    // Lets make a new actions that just pulls last 5 actives from database....
  }

  render() {
    return <div>Last Five</div>;
  }
}

function mapStateToProps(state) {
  console.log(state.conditions.allConditions);
  return state;
}

export default connect(mapStateToProps, actions)(LastFiveConditions);
