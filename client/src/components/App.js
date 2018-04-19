import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
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
import NoonConference from './conferences/NoonConference';
import ConditionTopLevelViewGQL from './conditionGraphQl/ContitionTopLevelView';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signout" component={Signout} />
          <Route
            exact
            path="/conditions"
            component={RequireAuth(ConditionTopLevelViewGQL)}
          />
          <Route
            exact
            path={`/conditions/condition/:id`}
            component={RequireAuth(ConditionPage)}
          />
          <Route
            exat
            path="/conditionGQL"
            component={RequireAuth(ConditionTopLevelViewGQL)}
          />
          <Route path="/rotations" component={RequireAuth(Rotations)} />
          <Route exact path="/users" component={RequireAuth(ListOfAllUsers)} />
          <Route
            exact
            path={`/users/user/:id`}
            component={RequireAuth(ModifyUser)}
          />
          <Route path={`/users/newUser`} component={RequireAuth(ModifyUser)} />
          <Route path={`/messages`} component={RequireAuth(Messages)} />
          <Route
            path={`/noonConference`}
            component={RequireAuth(NoonConference)}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
