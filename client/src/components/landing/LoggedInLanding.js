import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import UpComing from './UpComing';
import LearningLanding from './LearningLanding';

class LoggedInLanding extends Component {
  render() {
    var currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));
    var name = currentUser.name.split(' ')[1];
    return (
      <Container style={{ marginTop: '4em' }}>
        <Segment>
          <h3>Hey there Dr. {name}, you're awesome</h3>
          <h4>
            Welcome to the{' '}
            <span style={{ color: '#5E9B6A' }}>
              Virginia Mason: Internal Medicine Residency
            </span>{' '}
            website
          </h4>
        </Segment>
        <UpComing name={name} />
        <LearningLanding currentUser={currentUser} />
      </Container>
    );
  }
}

export default LoggedInLanding;
