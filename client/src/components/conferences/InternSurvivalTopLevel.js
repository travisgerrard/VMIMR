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

var survivalGuideLinks = [
  {
    id: '07',
    linkURL: 'http://bit.ly/WSG_Lytes',
    linkText: `Replacing electrolytes`,
  },
  {
    id: '01',
    linkURL: 'http://bit.ly/WSG_ABX',
    linkText: `ABx - Beta-Lactams & Fluoroquinolones`,
  },
  {
    id: '03',
    linkURL: 'http://bit.ly/WSG_CP',
    linkText: `Chest pain`,
  },
  {
    id: '12',
    linkURL: 'http://bit.ly/WSG_Insulin',
    linkText: `DKA/Insulin/Diabetes in the hospital`,
  },
  {
    id: '05',
    linkURL: 'http://bit.ly/WSG_AMA',
    linkText: `Guide to patient leaving AMA`,
  },
  {
    id: '02',
    linkURL: 'http://bit.ly/WSG_BP',
    linkText: `Hypertension in the hospital`,
  },

  {
    id: '04',
    linkURL: 'http://bit.ly/WSG_Pain',
    linkText: `Pain (non-cardiac) in the hospitalized patient`,
  },

  {
    id: '06',
    linkURL: 'http://bit.ly/WSG_AMS',
    linkText: `Altered Mental Status`,
  },

  {
    id: '08',
    linkURL: 'http://bit.ly/WSG_Seizure',
    linkText: `Seizures in the hospital`,
  },
  {
    id: '09',
    linkURL: 'http://bit.ly/WSG_NV',
    linkText: `Nausea and vomiting`,
  },
  {
    id: '10',
    linkURL: 'http://bit.ly/WSG_CodeStatus',
    linkText: `The code status talk`,
  },
  {
    id: '11',
    linkURL: 'http://bit.ly/WSG_RBC',
    linkText: `RBC transfusions`,
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
