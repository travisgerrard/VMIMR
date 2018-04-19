import React from 'react';
//import LastFiveConditions from './landing/LastFiveConditions';
import Conditions from './conditions/ConditionTopLevelView';
import { Container } from 'semantic-ui-react';
import Signin from './auth/Signin';

const Landing = () => {
  var landingPage;
  if (localStorage.getItem('VMIMRToken') !== null) {
    landingPage = (
      <div>
        <Conditions />
      </div>
    );
  } else {
    landingPage = (
      <Container style={{ marginTop: '4.5em' }} textAlign="center">
        <h1>VM:IMR</h1>
        <p>
          Welcome to the Virginia Mason: Internal Medicine recidency home page
          for residents
        </p>
        <p>Aiming to help organize your residency life and learning</p>

        <Signin />
      </Container>
    );
  }

  return <div>{landingPage}</div>;
};

export default Landing;
