// Handles the provider portion of the rotaiton view

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Segment, Button, Form, Grid, Modal, Confirm } from 'semantic-ui-react';

import ADD_PROVIDER from '../../mutations/AddProvider';
import DELETE_PROVIDER from '../../mutations/DeleteProvider';

import SELECTED_ROTATION from '../../queries/SelectedRotation';

class RotationProviders extends Component {
  state = {
    id: '12345',
    providerName: '',
    providerGeneralInfo: '',
    addProvider: false,
    errors: '',
    modalHeader: 'Add a provider',
    confirmOpen: false,
    idToDelete: '',
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
              id: '12345',
              modalHeader: 'Add a provider',
            });
          }}
        >
          {(addProvider, { data }) => (
            <Modal open={this.state.addProvider} size="large">
              <Modal.Header>{this.state.modalHeader}</Modal.Header>
              <Segment>
                <Form
                  onSubmit={() =>
                    addProvider({
                      variables: {
                        id: this.state.id,
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
                    onChange={e =>
                      this.setState({ providerName: e.target.value })
                    }
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
              </Segment>
            </Modal>
          )}
        </Mutation>
      );
    } else if (this.state.confirmOpen) {
      return (
        <Mutation
          mutation={DELETE_PROVIDER}
          refetchQueries={[
            { query: SELECTED_ROTATION, variables: { id: this.props.id } },
          ]}
        >
          {(deleteProvider, { data }) => (
            <Confirm
              open={this.state.confirmOpen}
              content="Are you sure you want to delete this provider?"
              onCancel={() => this.setState({ confirmOpen: false })}
              onConfirm={() => {
                deleteProvider({
                  variables: {
                    id: this.state.idToDelete,
                  },
                });
                this.setState({ confirmOpen: false });
              }}
            />
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

  editProviderButtonClicked = ({ id, name, generalInfo }) => {
    console.log(id, name, generalInfo);
    this.setState({
      id,
      providerName: name,
      providerGeneralInfo: generalInfo,
      modalHeader: 'Edit a provider',
      addProvider: true,
    });
  };

  deleteProvider = id => {
    this.setState({ confirmOpen: true });
    this.setState({ idToDelete: id });
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
                        onClick={() => this.editProviderButtonClicked(provider)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="mini"
                        color="red"
                        onClick={() => this.deleteProvider(provider.id)}
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
