import React, { Component } from 'react';
import { Query, withApollo, readQuery, graphql } from 'react-apollo';
import { Segment, Container, Button, Form, TextArea } from 'semantic-ui-react';

import GET_CURRENT_USER from '../../queries/CurrentUser';
import SELECTED_ROTATION from '../../queries/SelectedRotation';
import UPDATE_ROTATION from '../../mutations/UpdateRotation';

import RotationGeneralInfo from './RotationGeneralInfo';

class RotationMainView extends Component {
  state = {
    providerName: '',
    providerGeneralInfo: '',
    addProvider: false,
    errors: '',
  };

  handleAddProviderClick = e => {
    this.setState({ addProvider: true });
  };
  handleAddProviderSubmit = e => {
    this.setState({ addProvider: false });
  };

  adminProviderInfo = () => {
    if (this.state.addProvider) {
      return (
        <Form onSubmit={() => this.handleAddProviderSubmit()}>
          <Form.Input
            fluid
            label="Provider Name"
            value={this.state.providerName}
            onChange={e => this.setState({ providerName: e.target.value })}
          />
          <Form.TextArea
            label="Provider Info"
            value={this.state.providerGeneralInfo}
            onChange={e =>
              this.setState({ providerGeneralInfo: e.target.value })
            }
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      );
    } else {
      return (
        <Button size="mini" onClick={() => this.handleAddProviderClick()}>
          Add
        </Button>
      );
    }
  };

  displayProviderInfo = (providers, isAdmin) => {
    if (isAdmin) {
      return (
        <div>
          <h4 style={{ display: 'inline-block', float: 'left' }}>Providers</h4>
          {this.adminProviderInfo()}
          <Segment.Group style={{ marginRight: 25 }}>
            {providers.map(provider => {
              return (
                <Segment key={provider.id}>
                  <h4>{provider.name}</h4>
                  <p>{provider.generalInfo}</p>
                </Segment>
              );
            })}
          </Segment.Group>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Providers</h4>
          <Segment.Group style={{ marginRight: 25 }}>
            {providers.map(provider => {
              return (
                <Segment key={provider.id}>
                  <h4>{provider.name}</h4>
                  <p>{provider.generalInfo}</p>
                </Segment>
              );
            })}
          </Segment.Group>
        </div>
      );
    }
  };

  getTitleInfoProviders = () => {
    return (
      <Query query={SELECTED_ROTATION} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const currentUserQuery = this.props.client.readQuery({
            query: GET_CURRENT_USER,
          });

          console.log(data.returnRotation);

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
              {this.displayProviderInfo(providers, admin)}
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
