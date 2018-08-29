import React, { Component } from 'react';
//import LastFiveConditions from './landing/LastFiveConditions';
//import ConditionTopLevelViewGQL from './conditionGraphQl/ContitionTopLevelView';
import LandingPage from './landing/LoggedInLanding';

//import Conditions from './conditions/ConditionTopLevelView';
import { Container, Divider } from 'semantic-ui-react';
import Signin from './auth/Signin';
//import SigninApollo from './auth/SignInApollo';
import InternSurvival from './conferences/InternSurvivalTopLevel';

import InstragramInset from './InstagramInset';

const lineOne = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontSize: '36px',
  padding: 3,
  margin: 3,
};
const lineTwo = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontSize: '28px',
  padding: 5,
  margin: 5,
};
const lineThree = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontSize: '16px',
  padding: 5,
  margin: 5,
};

class Landing extends Component {
  renderTheHomePage = () => {
    var landingPage;
    if (localStorage.getItem('VMIMRToken') !== null) {
      landingPage = <LandingPage />;
    } else {
      landingPage = (
        <div>
          <Container textAlign="center">
            <div>
              <p style={lineOne}>Virginia Mason</p>
              <p style={lineTwo}>Internal Medicine Residency</p>
              <p style={lineThree}>
                Organizing your residency life and learning
              </p>
            </div>

            <Divider />

            <Signin />

            <Divider />
            <InternSurvival />
            <Divider />
            <InstragramInset />
          </Container>
        </div>
      );
    }

    return landingPage;
  };

  render() {
    return <div>{this.renderTheHomePage()}</div>;
  }
}

export default Landing;
