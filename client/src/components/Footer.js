import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div
        className="ui inverted vertical footer segment"
        style={{ marginTop: 25, backgroundColor: '#479E65' }}
      >
        <div className="ui center aligned container">
          <h4 className="ui inverted header">
            &copy; Copyright 2018 | All rights reserved
          </h4>
        </div>
      </div>
    );
  }
}

export default Footer;