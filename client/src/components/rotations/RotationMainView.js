import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';
import { Container } from 'semantic-ui-react';

import GET_CURRENT_USER from '../../queries/CurrentUser';
import SELECTED_ROTATION from '../../queries/SelectedRotation';

import RotationGeneralInfo from './RotationGeneralInfo';
import RotationProviders from './RotationProviders';

class RotationMainView extends Component {
  getTitleInfoProviders = () => {
    return (
      <Query query={SELECTED_ROTATION} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const currentUserQuery = this.props.client.readQuery({
            query: GET_CURRENT_USER,
          });

          const { admin } = currentUserQuery.currentUser;
          const { generalInfo, title, providers } = data.returnRotation;

          return (
            <Container>
              <h1>{title}</h1>
              <RotationGeneralInfo
                generalInfo={generalInfo}
                admin={admin}
                id={this.props.id}
              />
              <br />
              <RotationProviders
                providers={providers}
                admin={admin}
                id={this.props.id}
                creator={currentUserQuery.currentUser.id}
              />
              <br />
              <h4>{title} learnings</h4>
              <p>Will pull in most recent conditions learned regarding gyn</p>

              <h4>General Comments</h4>
              <p>Will put in general comments section regarding the rotation</p>
            </Container>
          );
        }}
      </Query>
    );
  };

  render() {
    return <div>{this.getTitleInfoProviders()}</div>;
  }
}

export default withApollo(RotationMainView);
