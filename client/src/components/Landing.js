import React from 'react';
import LastFiveConditions from './landing/LastFiveConditions';

const Landing = () => {
  var landingPage;
  if (localStorage.getItem('token') !== null) {
    landingPage = (
      <div>
        <LastFiveConditions />
      </div>
    );
  } else {
    landingPage = <h5>Login to get started</h5>;
  }

  return <div>{landingPage}</div>;
};

export default Landing;
