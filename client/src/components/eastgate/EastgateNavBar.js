import React, { Component } from 'react';
import { Query } from 'react-apollo';
import GET_CURRENT_USER from '../../queries/CurrentUser';

class EastgateNavBar extends Component {
  render() {
    return (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return <div>Current User</div>;
        }}
      </Query>
    );
  }
}

export default EastgateNavBar;
