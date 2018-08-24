import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

const sectionStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontSize: '18px',
  padding: 10,
};

class InternSurvivalLinkSegment extends Component {
  render() {
    console.log('this ran');

    return (
      <Segment style={sectionStyle}>
        The Page:{' '}
        <a href={this.props.linkURL} target="_blank" rel="noopener noreferrer">
          {this.props.linkText}
        </a>
      </Segment>
    );
  }
}

export default InternSurvivalLinkSegment;
