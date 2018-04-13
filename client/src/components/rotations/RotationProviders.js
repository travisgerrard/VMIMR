import React, { Component } from 'react';
import { withApollo, graphql } from 'react-apollo';
import { Segment, Button, Form } from 'semantic-ui-react';

import ADD_PROVIDER from '../../mutations/AddProvider';
import SELECTED_ROTATION from '../../queries/SelectedRotation';

class RotationProviders extends Component {
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
    this.props
      .mutate({
        variables: {
          name: this.state.providerName,
          associatedRotation: this.props.id,
          generalInfo: this.state.providerGeneralInfo,
          _creator: this.props.creator,
        },
        refetchQueries: [
          { query: SELECTED_ROTATION, variables: { id: this.props.id } },
        ],
      })
      .then(this.setState({ addProvider: false }))
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
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
  render() {
    return (
      <div>
        {this.displayProviderInfo(this.props.providers, this.props.admin)}
      </div>
    );
  }
}

export default withApollo(graphql(ADD_PROVIDER)(RotationProviders));
