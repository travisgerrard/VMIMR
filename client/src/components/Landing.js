import React from 'react';
//import LastFiveConditions from './landing/LastFiveConditions';
//import ConditionTopLevelViewGQL from './conditionGraphQl/ContitionTopLevelView';
import LandingPage from './landing/LoggedInLanding';

//import Conditions from './conditions/ConditionTopLevelView';
import { Container, Segment } from 'semantic-ui-react';
import Signin from './auth/Signin';
import Blog from './conferences/Blog';

const Landing = () => {
  var landingPage;
  if (localStorage.getItem('VMIMRToken') !== null) {
    landingPage = <LandingPage />;
  } else {
    landingPage = (
      <div>
        <Container textAlign="center">
          <h1>Virginia Mason: Internal Medicine Residency</h1>
          <p>Welcome to VM:IMR, the homepage for IM residents at VM</p>
          <p>Aiming to help organize your residency life and learning</p>

          <Signin />
        </Container>

        <Blog />
      </div>
    );
  }

  return <div>{landingPage}</div>;
};

export default Landing;
