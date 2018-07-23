import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
const fontStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
};
class SortConditionCards extends Component {
  render() {
    const { activeItem } = this.props;
    return (
      <Menu pointing secondary>
        <Menu.Item
          name="Your Personal Learning"
          active={activeItem === 'Your Personal Learning'}
          style={fontStyle}
          onClick={this.props.handleItemClick}
        />
        <Menu.Item
          name="All Learning"
          active={activeItem === 'All Learning'}
          style={fontStyle}
          onClick={this.props.handleItemClick}
        />
      </Menu>
    );
  }
}

export default SortConditionCards;
