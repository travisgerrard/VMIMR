import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

const sectionStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontSize: '22px',
  paddingTop: 12,
  paddingBottom: 3,
  paddingLeft: 6,
  color: '#25015B',
  background: '#FDFDFD',
};

class InternSurvivalLinkSegment extends Component {
  render() {
    return (
      <Segment style={sectionStyle}>
        <a href={this.props.linkURL} target="_blank" rel="noopener noreferrer">
          {this.props.linkText}
        </a>
      </Segment>
    );
  }
}

export default InternSurvivalLinkSegment;
