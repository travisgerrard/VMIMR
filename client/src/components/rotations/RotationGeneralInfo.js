// Handles the genearl info portions of the rotation view

import React, { Component } from 'react';
import { withApollo, graphql } from 'react-apollo';
import { Segment, Button, Form, TextArea } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

import SELECTED_ROTATION from '../../queries/SelectedRotation';
import UPDATE_ROTATION from '../../mutations/UpdateRotation';

class RotationGeneralInfo extends Component {
  state = {
    editGeneralInfo: false,
    generalInfo: '',
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
        refetchQueries: [
          { query: SELECTED_ROTATION, variables: { id: this.props.id } },
        ],
      })
      .then(this.setState({ editGeneralInfo: false }))
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
            value={this.state.generalInfo ? this.state.generalInfo : ''}
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
          <Segment stacked style={{ marginRight: 25, whiteSpace: 'pre-wrap' }}>
            <ReactMarkdown source={this.state.generalInfo} />
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
          <Segment stacked style={{ marginRight: 25, whiteSpace: 'pre-wrap' }}>
            <ReactMarkdown source={generalInfo} />
          </Segment>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.displayGeneralInfo(this.props.generalInfo, this.props.admin)}
      </div>
    );
  }
}

export default withApollo(graphql(UPDATE_ROTATION)(RotationGeneralInfo));
