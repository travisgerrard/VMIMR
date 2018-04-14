import React from 'react';
import LastFiveConditions from './landing/LastFiveConditions';
import Conditions from './conditions/ConditionTopLevelView';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

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
      <Container style={{ marginTop: '4.5em' }}>
        <h1>VM:IMR</h1>
        <p>
          Welcome to the Virginia Mason: Internal Medicine recidency home page
          for residents
        </p>
        <p>Aiming to help organize your residency life and learning</p>
        <h3>
          <Link to="/signin">Login to get started</Link>
        </h3>
        <p>TK: Blog / noon conference report</p>
      </Container>
    );
  }

  return <div>{landingPage}</div>;
};

export default Landing;
