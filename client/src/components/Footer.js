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
            This is the bottom of VMIMR | Questions, Complaints? Email{' '}
            <a
              href="mailto:travis.gerrard@virginiamason.org"
              style={{ color: 'white', textDecoration: 'underline' }}
            >
              travis.gerrard@virginiamason.org
            </a>
          </h4>
        </div>
      </div>
    );
  }
}

export default Footer;
