import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import RotationConditionOverview from './rotation/RotationConditionOverview';
import * as actions from '../../actions';
import RotationDropDown from './rotation/shared/RotationDropDown';

class ConditionTopLevelView extends Component {
  componentWillMount() {
    this.props.fetchAllConditions();
  }

  render() {
    return (
      <Container>
        <span>
          <h4>
            Conditions for{' '}
            <RotationDropDown
              multiple={false}
              inline
              placeholder="All"
              onChange={(params, data) =>
                this.props.setRotationSelected(data.value)
              }
            />{' '}
            rotation(s)
          </h4>
        </span>
        <br />
        <RotationConditionOverview title="" />
      </Container>
    );
  }
}

export default connect(null, actions)(ConditionTopLevelView);
