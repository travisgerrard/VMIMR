import React, { Component } from 'react';
import { Divider, Grid, Header } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import UpComing from './UpComing';
import LearningLanding from './LearningLanding';
import InternSurvival from '../conferences/InternSurvivalTopLevel';
import ConferenceLanding from './ConferenceLanding';
import PhotoInset from '../PhotoInset';

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
    const scheduleImage =
      'https://s3-us-west-2.amazonaws.com/vmimr/ConferenceSchedule.png';

    return (
      <div style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
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

        <Grid stackable columns={2}>
          <Grid.Column>
            <PhotoInset
              link={scheduleImage}
              headerPhoto="http://files.constantcontact.com/6f3956be401/f4017f76-fc6d-4977-b6e7-dc02ac5ebff8.jpg?a=1128943245496"
              mainPhoto={scheduleImage}
              name="schedule"
            />
          </Grid.Column>
          <Grid.Column>
            <PhotoInset
              link="https://www.instagram.com/vmimr"
              headerPhoto="https://protectyoungeyes.com/wp-content/uploads/2015/04/2475.new-instagram-text-logo.png"
              mainPhoto="https://scontent-sea1-1.cdninstagram.com/vp/2da7cf4e0dbfbc92a3dfdffeb0c251ab/5C037949/t51.2885-15/sh0.08/e35/s640x640/39248344_1036318689861743_8502475382677569536_n.jpg"
              name="instagram"
            />
          </Grid.Column>
        </Grid>

        <Divider />

        <UpComing name={name} />
      </div>
    );
  }
}

export default LoggedInLanding;
