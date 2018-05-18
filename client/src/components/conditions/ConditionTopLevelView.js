import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
import * as actions from '../../actions';
import RotationDropDown from './rotation/shared/RotationDropDown';
import RotationConditionInput from './rotation/RotationConditionInput';
import RotationConditionList from './rotation/RotationConditionList';

class ConditionTopLevelView extends Component {
  state = { activeItem: 'all' };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentWillMount() {
    this.props.fetchAllConditions();
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Container style={{ marginTop: 10 }}>
          <Menu pointing secondary>
            <Menu.Item
              name="all"
              active={activeItem === 'all'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="personal"
              active={activeItem === 'personal'}
              onClick={this.handleItemClick}
            />
          </Menu>
          <p>
            Search for a condition: If conditions exists, add learning to it; If
            it doesn't exist add it with associated learning
          </p>
          <h4 style={{ display: 'inline-block', marginBottom: '2em' }}>
            <RotationConditionInput title="" />
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
          <br />
          <RotationConditionList
            title=""
            conditionFilter={this.state.activeItem}
          />
        </Container>
      </div>
    );
  }
}

export default connect(null, actions)(ConditionTopLevelView);
