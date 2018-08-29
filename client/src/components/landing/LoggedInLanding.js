import React, { Component } from 'react';
import { Divider, Grid, Header } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import UpComing from './UpComing';
import LearningLanding from './LearningLanding';
import InternSurvival from '../conferences/InternSurvivalTopLevel';
import ConferenceLanding from './ConferenceLanding';
import InstragramInset from '../InstagramInset';

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
};
class LoggedInLanding extends Component {
  adjectiveMaker = () => {
    return ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  };

  // Lets create a 3 content grid...
  render() {
    var currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));
    var name = currentUser.name.split(' ')[1];
    return (
      <div style={{ margin: 25 }}>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Header textAlign="center" style={({ marginBottom: 0 }, fontStyle)}>
            Hey there Dr. {name}, you're <b>{this.adjectiveMaker()}</b>!
          </Header>
        </div>
        <Grid stackable columns={3}>
          <Grid.Column>
            <InternSurvival />
          </Grid.Column>
          <Grid.Column>
            <ConferenceLanding />
          </Grid.Column>
          <Grid.Column>
            <LearningLanding currentUser={currentUser} />
          </Grid.Column>
        </Grid>
        <Divider />

        <InstragramInset />
        <Divider />

        <UpComing name={name} />
      </div>
    );
  }
}

export default LoggedInLanding;
