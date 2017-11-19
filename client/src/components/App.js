import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import Feature from './Feature';
import RequireAuth from './auth/require_authentication';

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
          <Route exact path="/feature" component={RequireAuth(Feature)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
