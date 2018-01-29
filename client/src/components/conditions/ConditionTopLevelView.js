import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import * as actions from '../../actions';
import RotationDropDown from './rotation/shared/RotationDropDown';
import RotationConditionInput from './rotation/RotationConditionInput';
import RotationConditionList from './rotation/RotationConditionList';

class ConditionTopLevelView extends Component {
  componentWillMount() {
    this.props.fetchAllConditions();
  }

  render() {
    return (
      <Container>
        <p>
          Search for a condition: If conditions exists, add learning to it; If
          it doesn't exist add it with associated learning
        </p>
        <RotationConditionInput title="" />
        <span>
          <h4>
            Rotation:{' '}
            <RotationDropDown
              multiple={false}
              inline
              placeholder="All"
              onChange={(params, data) =>
                this.props.setRotationSelected(data.value)
              }
            />{' '}
          </h4>
        </span>
        <br />
        <RotationConditionList title="" />
      </Container>
    );
  }
}

export default connect(null, actions)(ConditionTopLevelView);
