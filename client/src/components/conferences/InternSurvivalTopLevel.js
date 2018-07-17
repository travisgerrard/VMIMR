import React, { Component } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const titleStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'lighter',
  lineHeight: 'normal',
  fontSize: '24px',
  backgroundColor: '#E8F4F7',
  padding: 10,
};

const sectionStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'lighter',
  lineHeight: 'normal',
  fontSize: '18px',
  padding: 10,
};

class InternSurvivalTopLevel extends Component {
  render() {
    return (
      <Segment.Group>
        <Segment style={titleStyle}>Wards Survival Skills</Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_BP" target="_blank">
            Patient has BP of 190/100
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_CP" target="_blank">
            Patient has chest pain!
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_Pain" target="_blank">
            Back pain, need vit D!
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_AMA" target="_blank">
            Patient wants to leave AMA!
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_AMS" target="_blank">
            Patient's delerius, need restraints
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_Lytes" target="_blank">
            Patient's K & Mag are low!
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_Seizure" target="_blank">
            The patient is seizing!
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_NV" target="_blank">
            The patient is vomiting!
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_CodeStatus" target="_blank">
            What's patient's code status
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a href="http://bit.ly/WSG_RBC" target="_blank">
            Patient needs blood!
          </a>
        </Segment>
      </Segment.Group>
    );
  }
}

export default InternSurvivalTopLevel;
