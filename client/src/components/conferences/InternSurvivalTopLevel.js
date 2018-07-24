import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

const titleStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontSize: '24px',
  backgroundColor: '#E8F4F7',
  padding: 10,
};

const sectionStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
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
          <a
            href="http://bit.ly/WSG_ABX"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patient w/ sepsis, ABX plz! (Guide to Beta-Lactams)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_BP"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patient has BP of 190/100 (Guide to hypertension)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_CP"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patient has chest pain! (Guide to chest pain)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_Pain"
            target="_blank"
            rel="noopener noreferrer"
          >
            Back pain, need vit D! (Guide to general pain)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_AMA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patient wants to leave AMA! (Guide to patient leaving AMA)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_AMS"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patient's delirious, need restraints (Guide to AMS)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_Lytes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patient's K & Mag are low! (Guide to replacing electrolytes)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_Seizure"
            target="_blank"
            rel="noopener noreferrer"
          >
            The patient is seizing! (Guide to seizures)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_NV"
            target="_blank"
            rel="noopener noreferrer"
          >
            The patient is vomiting! (Guide to nausea and vomiting)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_CodeStatus"
            target="_blank"
            rel="noopener noreferrer"
          >
            What's patient's code status (Guide to the code status talk)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          The Page:{' '}
          <a
            href="http://bit.ly/WSG_RBC"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patient needs blood! (Guide to RBC transfusion)
          </a>
        </Segment>
        <Segment style={sectionStyle}>
          <a
            href="http://bit.ly/WSG_LF"
            target="_blank"
            rel="noopener noreferrer"
          >
            Format your list to make it more usable
          </a>
        </Segment>
      </Segment.Group>
    );
  }
}

export default InternSurvivalTopLevel;
