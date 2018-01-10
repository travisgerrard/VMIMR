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
    landingPage = (
      <div>
        <h3>Login to get started</h3>
        <p>Perhaps some promo info should go here...</p>
      </div>
    );
  }

  return <div>{landingPage}</div>;
};

export default Landing;
