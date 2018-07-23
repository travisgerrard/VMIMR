import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

const fontStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
};

class SortConferenceCards extends Component {
  render() {
    const { activeItem } = this.props;

    return (
      <Menu pointing secondary stackable>
        <Menu.Item
          name="All"
          active={activeItem === 'all'}
          onClick={() => this.props.handleItemClick('all')}
          style={fontStyle}
        />
        <Menu.Item
          name="Noon: Resident Presentation"
          active={activeItem === 'case'}
          onClick={() => this.props.handleItemClick('case')}
          style={fontStyle}
        />
        <Menu.Item
          name="Noon: Specialist Presentation"
          active={activeItem === 'specialist'}
          onClick={() => this.props.handleItemClick('specialist')}
          style={fontStyle}
        />
        <Menu.Item
          name="Primary Card Didactic"
          active={activeItem === 'primaryCare'}
          onClick={() => this.props.handleItemClick('primaryCare')}
          style={fontStyle}
        />
        <Menu.Item
          name="Morning Report"
          active={activeItem === 'morning'}
          onClick={() => this.props.handleItemClick('morning')}
          style={fontStyle}
        />
        <Menu.Item
          name="Intern Survival Guide"
          active={activeItem === 'internSurvival'}
          onClick={() => this.props.handleItemClick('internSurvival')}
          style={fontStyle}
        />
      </Menu>
    );
  }
}

export default SortConferenceCards;
