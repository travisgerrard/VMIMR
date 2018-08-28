import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

class InstagramInset extends Component {
  render() {
    return (
      <div
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          marginRight: 'auto',
          marginLeft: 'auto',
          maxWidth: '540px',
          minWidth: '326px',
          padding: '0',
          width: '99.375%',
        }}
      >
        <div style={{ padding: '8px' }}>
          <a
            href="https://www.instagram.com/vmimr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="instagram"
              src="https://protectyoungeyes.com/wp-content/uploads/2015/04/2475.new-instagram-text-logo.png"
              style={{ width: '40%' }}
            />
          </a>

          <Image
            src="https://scontent-sea1-1.cdninstagram.com/vp/2da7cf4e0dbfbc92a3dfdffeb0c251ab/5C037949/t51.2885-15/sh0.08/e35/s640x640/39248344_1036318689861743_8502475382677569536_n.jpg"
            fluid
          />
        </div>
      </div>
    );
  }
}

export default InstagramInset;
