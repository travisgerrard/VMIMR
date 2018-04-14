import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class SortConditionCards extends Component {
  render() {
    const { activeItem } = this.props;
    return (
      <Menu pointing secondary>
        <Menu.Item
          name="personal"
          active={activeItem === 'personal'}
          onClick={this.props.handleItemClick}
        />
        <Menu.Item
          name="all"
          active={activeItem === 'all'}
          onClick={this.props.handleItemClick}
        />
      </Menu>
    );
  }
}

export default SortConditionCards;
