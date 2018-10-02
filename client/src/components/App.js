import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import RequireAuth from './auth/require_authentication';
//import Conditions from './conditions/ConditionTopLevelView';
import Rotations from './rotations/RotationTopLevelView';
import ListOfAllUsers from './users/ListOfAllUsers';
import ModifyUser from './users/ModifyUser';
import Messages from './messages';
import ConditionPage from './conditions/rotation/ConditionPage';
import ConferenceList from './conferences/ConferenceTopLevel';
import NoonConferenceAdmin from './conferences/NoonConferenceWrapper';
import NoonConferenceView from './conferences/NoonConferenceView';
import ConditionTopLevelViewGQL from './conditionGraphQl/ContitionTopLevelView';
import Eastgate from './eastgate/EastgateTopLevelView';
import LoggedInLanding from './landing/LoggedInLanding';
//import MasterSchedule from './landing/MasterScheduleView';
import SurveyTopLevel from './survey/SurveyTopLevel';
import ListFormatter from './patientParser/patientParser';
import InternSurvivalTopLevel from './conferences/InternSurvivalTopLevel';
import GoogleAnalytics from './GoogleAnalytics';
import SpecialistEmailTemplateCreator from './emailTemplates/SpecialistEmailTemplateCreator';

class App extends Component {
  render() {
    const prod = document.location.hostname.search('vmimr.com') !== -1;

    return (
      <BrowserRouter>
        <div style={{ backgroundColor: '#F1F7FF' }}>
          <Header />

          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/landing"
            component={RequireAuth(LoggedInLanding)}
          />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signout" component={Signout} />
          <Route
            exact
            path="/conditions/"
            component={RequireAuth(ConditionTopLevelViewGQL)}
          />
          <Route
            exact
            path={`/conditions/condition/:id`}
            component={RequireAuth(ConditionPage)}
          />

          <Route exact path="/rotations" component={RequireAuth(Rotations)} />
          <Route
            exact
            path="/rotations/:id"
            component={RequireAuth(Rotations)}
          />

          <Route exact path="/users" component={RequireAuth(ListOfAllUsers)} />
          <Route
            exact
            path={`/users/user/:id`}
            component={RequireAuth(ModifyUser)}
          />
          <Route path={`/users/newUser`} component={RequireAuth(ModifyUser)} />
          <Route path={`/messages`} component={RequireAuth(Messages)} />
          <Route
            exact
            path={`/Conference`}
            component={RequireAuth(ConferenceList)}
          />
          <Route
            exact
            path={`/Conference/:id`}
            component={NoonConferenceView}
          />
          <Route
            exact
            path={`/ConferenceAdmin/:id`}
            component={RequireAuth(NoonConferenceAdmin)}
          />
          <Route path={`/eastgate`} component={RequireAuth(Eastgate)} />

          <Route path={'/survey'} component={RequireAuth(SurveyTopLevel)} />
          <Route path={`/listFormatter`} component={ListFormatter} />
          <Route path={`/survivalGuide`} component={InternSurvivalTopLevel} />
          <Route path={'/email'} component={SpecialistEmailTemplateCreator} />
          <Footer />
          {prod && <GoogleAnalytics />}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
