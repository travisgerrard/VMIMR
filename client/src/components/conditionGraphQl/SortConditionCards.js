import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class SortConditionCards extends Component {
  render() {
    const { activeItem } = this.props;
    return (
      <Menu pointing secondary>
        <Menu.Item
          name="Your Personal Learning"
          active={activeItem === 'Your Personal Learning'}
          onClick={this.props.handleItemClick}
        />
        <Menu.Item
          name="All Learning"
          active={activeItem === 'All Learning'}
          onClick={this.props.handleItemClick}
        />
      </Menu>
    );
  }
}

export default SortConditionCards;
