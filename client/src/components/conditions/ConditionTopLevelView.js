import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ConditionTopLevelView extends Component {
  componentWillMount() {
    this.props.fetchConditionMessage();
  }

  render() {
    return <div>{this.props.conditionMessage}</div>;
  }
}

function mapStateToProps(state) {
  return { conditionMessage: state.condition.message };
}

export default connect(mapStateToProps, actions)(ConditionTopLevelView);
