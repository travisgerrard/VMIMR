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
          maxWidth: '600px',
          minWidth: '326px',
          padding: '0',
          width: '99.375%',
        }}
      >
        <div style={{ padding: '8px' }}>
          <a
            href={this.props.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="instagram"
              src={this.props.headerPhoto}
              style={{ width: '40%' }}
            />
          </a>

          <Image
            src={this.props.mainPhoto}
            fluid
          />
        </div>
      </div>
    );
  }
}

export default InstagramInset;
