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
    errors: ''
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
      .then(this.setState({ editGeneralInfo: false }));
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
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
              {this.displayGeneralInfo(generalInfo, admin)}
              <h4>Providers</h4>
              <Segment.Group style={{ marginRight: 25 }}>
                {providers.map(provider => {
                  return <Segment key={provider}>{provider}</Segment>;
                })}
              </Segment.Group>

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
