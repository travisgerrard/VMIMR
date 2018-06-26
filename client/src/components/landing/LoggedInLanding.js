import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import UpComing from './UpComing';
import LearningLanding from './LearningLanding';
import ShowSurveyMessage from './SurveyMessage';
import Blog from '../conferences/Blog';

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
          <h3 style={{ marginBottom: 0 }}>
            Hey there Dr. {name}, you're <b>{this.adjectiveMaker()}</b>!
          </h3>
          <h3 style={{ marginTop: 3 }}>
            Welcome to the{' '}
            <span style={{ color: '#5E9B6A' }}>
              Virginia Mason: Internal Medicine Residency
            </span>{' '}
            website
          </h3>
        </div>
        <LearningLanding currentUser={currentUser} />
        <ShowSurveyMessage />
        <UpComing name={name} />
        <Blog />
      </Container>
    );
  }
}

export default LoggedInLanding;
