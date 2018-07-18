import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import UpComing from './UpComing';
import LearningLanding from './LearningLanding';
import ShowSurveyMessage from './SurveyMessage';
import InternSurvival from '../conferences/InternSurvivalTopLevel';
import ConferenceLanding from './ConferenceLanding';

const ADJECTIVES = [
  'awesome',
  'excellent',
  'outstanding',
  'impressive',
  'remarkable',
  'wonderful',
  'formidable',
  'exceptional',
  'extraordinary',
  'amazing',
  'marvelous',
  'astonishing',
  'astounding',
];

const fontStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'lighter',
};
class LoggedInLanding extends Component {
  adjectiveMaker = () => {
    return ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  };

  render() {
    var currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));
    var name = currentUser.name.split(' ')[1];
    return (
      <Container style={{ marginTop: 10 }}>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <h3 style={({ marginBottom: 0 }, fontStyle)}>
            Hey there Dr. {name}, you're <b>{this.adjectiveMaker()}</b>!
          </h3>
        </div>
        <InternSurvival />
        <Divider />
        <ConferenceLanding />
        <Divider />

        <LearningLanding currentUser={currentUser} />
        <ShowSurveyMessage />
        <UpComing name={name} />
      </Container>
    );
  }
}

export default LoggedInLanding;
