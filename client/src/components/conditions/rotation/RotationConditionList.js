import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ConditionCardView from './ConditionCardView';

class RotationConditionList extends Component {
  listOfConditions() {
    const conditions = this.props.conditions;
    return _.map(conditions, ({ catagoryTag, condition }) => {
      if (_.indexOf(catagoryTag, this.props.dbname) >= 0) {
        return (
          <div key={condition} style={{ cursor: 'pointer' }}>
            <ConditionCardView />
          </div>
        );
      }
    });
  }

  render() {
    return <div>{this.listOfConditions()}</div>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RotationConditionList);
