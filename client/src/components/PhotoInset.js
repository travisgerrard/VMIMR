import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import { admin } from './Utils';

import { Query, Mutation } from 'react-apollo';

import PICTURE_URL from '../queries/pictureURL';
import SET_PICTURE_URL from '../mutations/setPictureURLForName';

class InstagramInset extends Component {
  textInputIfAdmin = pictureURL => {
    if (admin()) {
      return (
        <Mutation mutation={SET_PICTURE_URL}>
          {mutationName => (
            <div>
              <input
                type="text"
                value={pictureURL ? pictureURL.url : '12345'}
                onChange={e =>
                  mutationName({
                    variables: {
                      name: this.props.name,
                      url: e.target.value,
                      id: pictureURL ? pictureURL.id : '12345',
                    },
                  })
                }
              />
            </div>
          )}
        </Mutation>
      );
    }
  };

  render() {
    return (
      <Query query={PICTURE_URL} variables={{ name: this.props.name }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          const { pictureURL } = data;

          return (
            <div
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow:
                  '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
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
                  href={this.props.link ? this.props.link : pictureURL.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="instagram"
                    src={this.props.headerPhoto}
                    style={{ width: '40%' }}
                  />
                </a>

                <Image src={pictureURL ? pictureURL.url : ''} fluid />
                {this.textInputIfAdmin(pictureURL)}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default InstagramInset;
