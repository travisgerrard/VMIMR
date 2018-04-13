import React, { Component } from 'react';
import { Query, withApollo, readQuery, graphql } from 'react-apollo';
import { Segment, Container, Button, Form, TextArea } from 'semantic-ui-react';

import GET_CURRENT_USER from '../../queries/CurrentUser';
import SELECTED_ROTATION from '../../queries/SelectedRotation';
import UPDATE_ROTATION from '../../mutations/UpdateRotation';

class RotationMainView extends Component {
  state = {
    editGeneralInfo: false,
    generalInfo: '',
    providerName: '',
    providerGeneralInfo: '',
    addProvider: false,
    errors: '',
  };

  handleEditGeneralInfoClick = e => this.setState({ editGeneralInfo: true });
  handleEditGeneralInfoSubmit = e => {
    this.props
      .mutate({
        variables: {
          id: this.props.id,
          generalInfo: this.state.generalInfo,
        },
        refetchQueries: [{ query: SELECTED_ROTATION }],
      })
      .then(this.setState({ editGeneralInfo: false }))
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };
  handleAddProviderClick = e => {
    this.setState({ addProvider: true });
  };
  handleAddProviderSubmit = e => {
    this.setState({ addProvider: false });
  };

  adminGeneralInfo = () => {
    if (this.state.editGeneralInfo) {
      return (
        <Form onSubmit={() => this.handleEditGeneralInfoSubmit()}>
          <TextArea
            value={this.state.generalInfo}
            onChange={e => this.setState({ generalInfo: e.target.value })}
          />
          <Button size="mini">Submit</Button>
        </Form>
      );
    } else {
      return (
        <div>
          <Button size="mini" onClick={() => this.handleEditGeneralInfoClick()}>
            Edit
          </Button>
          <Segment stacked style={{ marginRight: 25 }}>
            {this.state.generalInfo}
          </Segment>
        </div>
      );
    }
  };

  displayGeneralInfo = (generalInfo, isAdmin) => {
    if (isAdmin) {
      if (this.state.generalInfo === '') {
        this.setState({ generalInfo });
      }
      return (
        <div>
          <h4 style={{ display: 'inline-block', float: 'left' }}>
            General Info
          </h4>{' '}
          {this.adminGeneralInfo()}
        </div>
      );
    } else {
      return (
        <div>
          <h4>General Info</h4>
          <Segment stacked style={{ marginRight: 25 }}>
            {generalInfo}
          </Segment>
        </div>
      );
    }
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
              {this.displayGeneralInfo(generalInfo, admin)}
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

export default withApollo(graphql(UPDATE_ROTATION)(RotationMainView));
