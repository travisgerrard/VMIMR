import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import UpComing from './UpComing';

class LoggedInLanding extends Component {
  render() {
    var name = jwt_decode(localStorage.getItem('VMIMRToken')).name.split(
      ' ',
    )[1];
    return (
      <Grid style={{ marginTop: '0.5em' }}>
        <Grid.Row>
          <Grid.Column width={4}>
            <UpComing name={name} />
          </Grid.Column>
          <Grid.Column width={12}>
            <h3>Hey there Dr. {name}, you're awesome</h3>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LoggedInLanding;
