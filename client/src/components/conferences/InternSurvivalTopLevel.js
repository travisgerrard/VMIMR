import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import LinkSegment from './InternSurvivalLinkSegment';

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

var survivalGuideLinks = [
  {
    id: '07',
    linkURL: 'http://bit.ly/WSG_Lytes',
    linkText: `Patient's K & Mag are low! (Guide to replacing electrolytes)`,
  },
  {
    id: '01',
    linkURL: 'http://bit.ly/WSG_ABX',
    linkText: `Patient w/ sepsis, ABX plz! (Guide to Beta-Lactams & Fluoroquinolones)`,
  },
  {
    id: '03',
    linkURL: 'http://bit.ly/WSG_CP',
    linkText: `Patient has chest pain! (Guide to chest pain)`,
  },
  {
    id: '12',
    linkURL: 'http://bit.ly/WSG_Insulin',
    linkText: `Blood sugar 500, orders?! (Guide to DKA/Insulin/Diabetes)`,
  },
  {
    id: '05',
    linkURL: 'http://bit.ly/WSG_AMA',
    linkText: `Patient wants to leave AMA! (Guide to patient leaving AMA)`,
  },
  {
    id: '02',
    linkURL: 'http://bit.ly/WSG_BP',
    linkText: `Patient has BP of 190/100 (Guide to hypertension)`,
  },

  {
    id: '04',
    linkURL: 'http://bit.ly/WSG_Pain',
    linkText: `Back pain, need vit D! (Guide to general pain)`,
  },

  {
    id: '06',
    linkURL: 'http://bit.ly/WSG_AMS',
    linkText: `Patient's delirious, need restraints (Guide to AMS)`,
  },

  {
    id: '08',
    linkURL: 'http://bit.ly/WSG_Seizure',
    linkText: `The patient is seizing! (Guide to seizures)`,
  },
  {
    id: '09',
    linkURL: 'http://bit.ly/WSG_NV',
    linkText: `The patient is vomiting! (Guide to nausea and vomiting)`,
  },
  {
    id: '10',
    linkURL: 'http://bit.ly/WSG_CodeStatus',
    linkText: `What's patient's code status (Guide to the code status talk)`,
  },
  {
    id: '11',
    linkURL: 'http://bit.ly/WSG_RBC',
    linkText: `Patient needs blood! (Guide to RBC transfusion)`,
  },

  {
    id: '13',
    linkURL: 'http://bit.ly/WSG_LF',
    linkText: `Format your list to make it more usable`,
  },
];

class InternSurvivalTopLevel extends Component {
  returnLinkSegments = () => {
    return survivalGuideLinks.map(element => {
      console.log(element);

      return (
        <LinkSegment
          key={element.id}
          linkURL={element.linkURL}
          linkText={element.linkText}
        />
      );
    });
  };

  render() {
    return (
      <Segment.Group>
        <Segment style={titleStyle}>Wards Survival Skills</Segment>
        {this.returnLinkSegments()}
      </Segment.Group>
    );
  }
}

export default InternSurvivalTopLevel;
