import React, { Component } from "react";
//import LastFiveConditions from './landing/LastFiveConditions';
//import ConditionTopLevelViewGQL from './conditionGraphQl/ContitionTopLevelView';
import LandingPage from "./landing/LoggedInLanding";

//import Conditions from './conditions/ConditionTopLevelView';
import { Container, Divider } from "semantic-ui-react";
import Signin from "./auth/Signin";
//import SigninApollo from './auth/SignInApollo';
import InternSurvival from "./conferences/InternSurvivalTopLevel";

import PhotoInset from "./PhotoInset";

const lineOne = {
  fontFamily: "Lato",
  fontStyle: "normal",
  lineHeight: "normal",
  fontSize: "36px",
  padding: 3,
  margin: 3
};
const lineTwo = {
  fontFamily: "Lato",
  fontStyle: "normal",
  lineHeight: "normal",
  fontSize: "28px",
  padding: 5,
  margin: 5
};
const lineThree = {
  fontFamily: "Lato",
  fontStyle: "normal",
  lineHeight: "normal",
  fontSize: "16px",
  padding: 5,
  margin: 5
};

class Landing extends Component {
  renderTheHomePage = () => {
    var landingPage;
    if (localStorage.getItem("VMIMRToken") !== null) {
      landingPage = <LandingPage />;
    } else {
      const scheduleImage =
        "https://s3-us-west-2.amazonaws.com/vmimr/ConferenceSchedule.png";

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

            <PhotoInset
              link={scheduleImage}
              headerPhoto="http://files.constantcontact.com/6f3956be401/f4017f76-fc6d-4977-b6e7-dc02ac5ebff8.jpg?a=1128943245496"
              mainPhoto={scheduleImage}
            />

            <Divider />

            <Signin />

            <Divider />
            <InternSurvival />
            <Divider />
            <PhotoInset
              link="https://www.instagram.com/vmimr"
              headerPhoto="https://protectyoungeyes.com/wp-content/uploads/2015/04/2475.new-instagram-text-logo.png"
              mainPhoto="https://scontent-sea1-1.cdninstagram.com/vp/2da7cf4e0dbfbc92a3dfdffeb0c251ab/5C037949/t51.2885-15/sh0.08/e35/s640x640/39248344_1036318689861743_8502475382677569536_n.jpg"
            />
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
