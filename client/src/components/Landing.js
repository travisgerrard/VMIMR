import React from 'react';
import LastFiveConditions from './landing/LastFiveConditions';
import { Link } from 'react-router-dom';

const Landing = () => {
  var landingPage;
  if (localStorage.getItem('VMIMRToken') !== null) {
    landingPage = (
      <div>
        <LastFiveConditions />
      </div>
    );
  } else {
    landingPage = (
      <div>
        <h3>
          <Link to="/signin">Login to get started</Link>
        </h3>
        <p>Perhaps some promo info should go here...</p>
      </div>
    );
  }

  return <div>{landingPage}</div>;
};

export default Landing;
