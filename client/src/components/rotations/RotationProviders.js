import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Segment, Button, Form, Grid } from 'semantic-ui-react';

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

  adminProviderInfo = () => {
    if (this.state.addProvider) {
      return (
        <Mutation
          mutation={ADD_PROVIDER}
          refetchQueries={[
            { query: SELECTED_ROTATION, variables: { id: this.props.id } },
          ]}
          onCompleted={() => {
            this.setState({
              addProvider: false,
              providerName: '',
              providerGeneralInfo: '',
            });
          }}
        >
          {(addProvider, { data }) => (
            <Form
              onSubmit={() =>
                addProvider({
                  variables: {
                    name: this.state.providerName,
                    associatedRotation: this.props.id,
                    generalInfo: this.state.providerGeneralInfo,
                    _creator: this.props.creator,
                  },
                })
              }
            >
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
              <Form.Group>
                <Form.Button>Submit</Form.Button>
                <Form.Button
                  onClick={() => this.setState({ addProvider: false })}
                >
                  Cancel
                </Form.Button>
              </Form.Group>
            </Form>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <Button size="mini" onClick={() => this.handleAddProviderClick()}>
            Add
          </Button>
        </div>
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
                  <Grid>
                    <Grid.Column width={8}>
                      <h4>{provider.name}</h4>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Button
                        size="mini"
                        onClick={() => console.log('edit clicked')}
                      >
                        Edit
                      </Button>
                      <Button
                        size="mini"
                        color="red"
                        onClick={() => console.log('delete clicked')}
                      >
                        Delete
                      </Button>
                    </Grid.Column>
                  </Grid>
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

export default RotationProviders;
